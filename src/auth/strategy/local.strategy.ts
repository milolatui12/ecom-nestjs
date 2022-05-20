import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginRequestDto, LoginResponseDto } from 'src/users/dtos';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(body: LoginRequestDto): Promise<LoginResponseDto> {
    console.log("a")
    const result = await this.authService.login(body);
    if (!result) {
      throw new UnauthorizedException();
    }
    return result;
  }
}
 