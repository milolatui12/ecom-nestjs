import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto, LoginResponseDto } from 'src/users/dtos';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticateUser(body: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      const { email, password } = body;
      const user = await this.userService.findUserByEmail(email);

      await this.verifyPassword(password, user.password);

      const payload = { email, role: user.role, userId: user._id };
      const accessToken = this.jwtService.sign(payload);
      return new LoginResponseDto(user, accessToken);
    } catch (error) {
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    }
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    }
  }
  
}
