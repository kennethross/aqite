import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  phone!: string;

  @ApiProperty()
  @IsArray()
  hobbies!: string[];

  @ApiProperty()
  @IsArray()
  skillSets!: string[];
}
