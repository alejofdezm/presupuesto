import { Controller, Post, Body,BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import * as admin from 'firebase-admin';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Registrar usuario con email y contraseña
  @Post('register')
  @ApiOperation({ summary: 'Register a new user with email and password' })
@ApiResponse({ status: 201, description: 'User created successfully' })
@ApiResponse({ status: 400, description: 'Invalid input' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerWithEmail(createUserDto);
  }

  // Iniciar sesión con email y contraseña
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginWithEmail(loginUserDto);
  }

  // Registrar usuario con Google
  @Post('google')
  async registerWithGoogle(@Body('token') googleToken: string) {
    return this.authService.registerWithGoogle(googleToken);
  }

  @Post('custom-to-id-token')
  async convertCustomTokenToIdToken(@Body('customToken') customToken: string): Promise<{ idToken: string }> {
    if (!customToken) {
      throw new BadRequestException('Custom token is required');
    }

    const idToken = await this.authService.convertCustomTokenToIdToken(customToken);
    return { idToken };
  }
}
