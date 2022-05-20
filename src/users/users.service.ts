import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './users.schema';
import { UserResponseDto, CreateUserRequestDto, LoginRequestDto, LoginResponseDto } from './dtos';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    // private readonly jwtService: JwtService,
  ) {}

  async createUser(body: CreateUserRequestDto): Promise<UserResponseDto> {
    const { email, password } = body;

    const salt = 10;
    
    const user = await this.usersModel.findOne({
      email,
    });
    
    if(user) {
      throw new Error();
    }
    const hashedPassword = await bcrypt.hash(password, salt);

    body.password = hashedPassword;
    
    const newUser = await this.usersModel.create(body);

    return new UserResponseDto(newUser);
  }

  async findUserByEmail(email: string): Promise<Users> {
    const user = await this.usersModel.findOne({
      email
    })
    if(!user) {
      throw new Error()
    }
    console.log("test user")
    return user
  }
}
