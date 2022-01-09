import { Controller, Get, Request, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express'

import { LocalAuthGuard } from './auth/guards/local-auth.guard'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.uploadImageToCloudinary(file);
  }
}
