import { Injectable } from '@nestjs/common';
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

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

    async login(body: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = body;
    const user = await this.userService.findUserByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error()
    }
    const accessToken = this.jwtService.sign(email)
    console.log(accessToken)
    return new LoginResponseDto(user, accessToken) 
  }
}