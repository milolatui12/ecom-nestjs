import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Type,
  mixin,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/users/roles/role.enum';

export const RoleGuard = (role: Role): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const token = request.cookies.Authentication;
      const user: any = this.jwtService.decode(token);

      return user?.role === role;
    }
  }

  return mixin(RoleGuardMixin);
};

// @Injectable()
// export class RoleGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest()
//     const token = request.cookies.Authentication
//     const user: any = this.jwtService.decode(token)

//     return user?.role === 'admin'
//   }
// }
