import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { FirebaseAuthModule } from '../firebase/firebase-auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([User]),FirebaseAuthModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}
