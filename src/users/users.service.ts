import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './users.schema';
import { UserResponseDto, CreateUserRequestDto } from './dtos';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async createUser(body: CreateUserRequestDto): Promise<UserResponseDto> {
    const { email, password } = body;

    const salt = 10;

    const user = this.usersModel.findOne({
      email,
    });

    if (user) {
      throw new HttpException('User with this email is existed', HttpStatus.BAD_REQUEST)
    }
    const hashedPassword = await bcrypt.hash(password, salt);

    body.password = hashedPassword;

    const newUser = await this.usersModel.create(body);

    return new UserResponseDto(newUser);
  }

  async findUserByEmail(email: string): Promise<UsersDocument> {
    const user = this.usersModel.findOne({
      email,
    });
    if (!user) {
      throw new Error();
    }
    return user;
  }

  async getUserById(id: string): Promise<Users> {
    const user = this.usersModel.findOne({ id });
    if(user) {
      return user
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND)
  }
}
