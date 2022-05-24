import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../roles/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Users, UsersDocument } from '../users.schema';

export class CreateUserRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum(Role)
  @ApiProperty({ enum: Role })
  role: Role;
}

export class UserResponseDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  roles: Role;

  constructor(user: Users) {
    this.firstName = user.firstName || null;
    this.lastName = user.lastName || null;
    this.phoneNumber = user.phoneNumber || null;
    this.fullName = user.fullName || null;
  }
}

export class LoginRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class LoginResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  roles: Role;

  @ApiProperty()
  accessToken: string;

  constructor(user: UsersDocument, accessToken) {
    this.userId = user._id || null
    this.firstName = user.firstName || null;
    this.lastName = user.lastName || null;
    this.phoneNumber = user.phoneNumber || null;
    this.fullName = user.fullName || null;
    this.accessToken = accessToken || null;
  }
}
