import { Controller, Get, Request, UseGuards, Patch, Body, UseInterceptors } from '@nestjs/common';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ProfileService } from './profile.service';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Controller('me')
@UseInterceptors(new SanitizeMongooseModelInterceptor({ excludeMongooseId: false, excludeMongooseV: true }))

export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly usersService: UsersService
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

}
