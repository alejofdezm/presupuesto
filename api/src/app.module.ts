import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL, 
      synchronize: true,
      database: 'presupuestodb',
      useUnifiedTopology: true,
      useNewUrlParser: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
