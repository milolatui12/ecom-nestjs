import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../roles/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../users.schema';

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
}

export class LoginResponseDto {
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

  constructor(user: Users, accessToken) {
    this.firstName = user.firstName || null;
    this.lastName = user.lastName || null;
    this.phoneNumber = user.phoneNumber || null;
    this.fullName = user.fullName || null;
    this.accessToken = accessToken || null;
  }
}
