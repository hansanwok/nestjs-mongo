import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const PER_PAGE = 10;

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

  async create(user, createProductDto: CreateProductDto): Promise<Product> {
    const authorId = user._id;
    const { categoryId, ...productData } = createProductDto;

    const createdProduct = new this.productModel({
      ...productData,
      author: authorId,
      category: categoryId
    });
    const newProduct = await createdProduct.save();
    return newProduct.populate('category author', '-password');
  }

  async findAll({ page, category, name, userId }: { page: number, category?: any, name?: string, userId?: string }) {
    const queryOptions: any = {};
    if (category) {
      queryOptions.category = category;
    }
    if (name) {
      queryOptions.name = { $regex: name, $options: 'i' }
    }
    if (userId) {
      queryOptions.author = userId;
    }

    const data = await this.productModel.find(queryOptions).limit(PER_PAGE).skip(PER_PAGE * (page - 1)).sort({ createdAt: 'desc' }).exec();
    const pagination = await this.paginate(queryOptions, page);
    return {
      data,
      pagination
    }
  }

  async findRelated(id: string): Promise<Product[]> {
    const { category }: Product = await this.productModel.findById(id).exec();
    return this.productModel.find({ category, _id: { $ne: id } }).limit(3).sort({ createdAt: 'desc' }).exec()
  }

  findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).populate('category author', '-password').exec()
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string, user) {
    try {
      const currentProduct = await this.productModel.findById(id, { author: user._id }).exec();
      if (!currentProduct) {
        throw new UnauthorizedException();
      }
      const isDeleted = await this.productModel.findByIdAndDelete(id).exec();
      if (isDeleted) {
        return {
          success: true
        }
      }
    } catch (error) {
      throw error
    }
  }

  async paginate(options: any, page: number) {
    const total = await this.productModel.count(options).exec();
    const totalPages = Math.round(total / PER_PAGE)
    return {
      page,
      totalCount: total,
      totalPages,
    }
  }
}
