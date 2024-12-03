import { Controller, Get, Post, Body,UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';

import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@ApiTags('users') 
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of all users', type: [User] })

  @Get('getall')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Add a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created', type: User })
  @UseGuards(FirebaseAuthGuard)
  @Post()
  async addUser(@Body() createUserDto: User): Promise<User> {
    return this.userService.addUser(createUserDto.name, createUserDto.email);
  }
}
