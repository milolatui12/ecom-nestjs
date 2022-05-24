import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginRequestDto, LoginResponseDto } from 'src/users/dtos';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email'
    });
  }

  async validate(email: string, password: string): Promise<LoginResponseDto> {
    const body = new LoginRequestDto(email, password)
    const result = await this.authService.authenticateUser(body);
    if (!result) {
      throw new UnauthorizedException();
    }
    return result;
  }
}
 