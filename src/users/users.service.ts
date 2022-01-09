import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userInfo } = createUserDto;
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds)
    const createdUser = new this.userModel({ ...userInfo, password: hashPassword });
    return createdUser.save()
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
