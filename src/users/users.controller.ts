import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserResponseDto, CreateUserRequestDto, LoginResponseDto, LoginRequestDto } from './dtos';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiCreatedResponse({
    type: UserResponseDto,
    description: 'Create user successfully',
  })
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body() user: CreateUserRequestDto,
    @Res() res: Response,
  ): Promise<UserResponseDto> {
    try {
      const result = await this.userService.createUser(user);
      res.status(HttpStatus.CREATED).send({
        msg: 'user created',
      });
      return result
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send({
        msg: 'something went wrong',
        error,
      });
    }
  }

  // @Post()
  // @ApiOperation({
  //   summary: 'Login'
  // })
  // @ApiCreatedResponse({
  //   type: LoginResponseDto,
  //   description: "Login user successfully"
  // })
  // @UsePipes(new ValidationPipe())
  // async login(@Body() body: LoginRequestDto, @Res() res: Response): Promise<LoginResponseDto> {
  //   try {
  //     const result = await this.userService.validateUser(body)
  //     res.status(HttpStatus.OK).send({
  //       result
  //     })
  //     return result
  //   } catch (error) {
  //     res.status(HttpStatus.BAD_REQUEST).send({
  //       msg: 'something went wrong',
  //       error,
  //     });
  //   }

  // }
}
