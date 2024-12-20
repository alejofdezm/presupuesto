import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

 
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
 
  async addUser(name: string, email: string): Promise<User> {    
    const newUser = this.userRepository.create({ name, email });    
    return await this.userRepository.save(newUser);
  }
}
