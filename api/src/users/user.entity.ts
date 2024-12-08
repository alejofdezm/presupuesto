import { ApiProperty } from '@nestjs/swagger';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    example: '6479f20f3b45c5e6e3d5f3f2',
    description: 'Unique identifier for the user (MongoDB ObjectId)',
  })
  @ObjectIdColumn()
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  @Column()
  email: string;
}
