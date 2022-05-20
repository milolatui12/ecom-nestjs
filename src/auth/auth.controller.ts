import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginRequestDto, LoginResponseDto } from 'src/users/dtos';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login',
  })
  @ApiCreatedResponse({
    type: LoginResponseDto,
    description: 'Login user successfully',
  })
  @UsePipes(new ValidationPipe())
  //   @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() body: LoginRequestDto,
    @Res() res: Response,
  ): Promise<LoginResponseDto> {
    try {
      const result = await this.authService.login(body);
      res.status(HttpStatus.OK).send({
        result,
      });
      return result;
    } catch (error) {
        console.log(error)
      res.status(HttpStatus.BAD_REQUEST).send({
        msg: 'something went wrong',
        error,
      });
    }
  }
}
