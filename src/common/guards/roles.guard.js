import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard {
  canActivate(context) {
    // false: 403 Forbidden resource
    return true;
  }
}
