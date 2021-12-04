import { Controller, Bind, Get, Req } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  @Bind(Req())
  findAll(request) {
    return 'This action returns all users';
  }

  @Get('profile')
  findCurrentUserProfile() {
    return 'This action returns users profile';
  }
}
