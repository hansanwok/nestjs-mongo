import { Controller, Get, Request, UseGuards, Patch, Body, UseInterceptors, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ProfileService } from './profile.service';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Controller('me')
@UseInterceptors(new SanitizeMongooseModelInterceptor({ excludeMongooseId: false, excludeMongooseV: true }))

export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user._id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user._id, updateUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('products')
  getMyProducts(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    const userId: string = req.user._id
    return this.productsService.findAll({ userId, page });
  }

}
