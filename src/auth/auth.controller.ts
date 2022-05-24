import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginRequestDto, LoginResponseDto } from 'src/users/dtos';
import { Role } from 'src/users/roles/role.enum';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RoleGuard } from './guards/roles.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly jwtService: JwtService) {}

  @ApiOperation({
    summary: 'Login',
  })
  @ApiCreatedResponse({
    type: LoginResponseDto,
    description: 'Login user successfully',
  })
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('/login')
  async login(
    @Body() body: LoginRequestDto,
    @Res() res: Response,
  ): Promise<LoginResponseDto> {
    const result = await this.authService.authenticateUser(body);
    res.cookie('Authentication', result.accessToken, { httpOnly: true }).send(result);
    return result
  }

  @ApiOperation({
    summary: 'Test authentication'
  })
  @ApiCreatedResponse({
    description: 'Test authentication when login'
  })
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async getAdmin(@Req() req, @Res() res) {
    const user = this.jwtService.decode(req.cookies.Authentication)
    res.status(200).send(user);
  }

  @ApiOperation({
    summary: 'Test authorization'
  })
  @ApiCreatedResponse({
    description: 'Test authorization after login'
  })
  @UseGuards(RoleGuard(Role.Buyer))
  @UseGuards(JwtAuthGuard)
  @Get('admin2')
  async getAdmin2(@Req() req, @Res() res) {
    const user = this.jwtService.decode(req.cookies.Authentication)
    res.status(200).send(user);
  }
}
