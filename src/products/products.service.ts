import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const LIMIT_PER_PAGE = 2;

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

  findAll(page: number): Promise<Product[]> {
    return this.productModel.find().sort({ createdAt: 'desc' }).exec();
  }

  findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).populate('category author', '-password').exec()
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
