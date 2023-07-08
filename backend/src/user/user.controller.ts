import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateApiOkSchema } from 'src/generate-api-schema';

@ApiExtraModels(CreateUserDto, UpdateUserDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    schema: generateApiOkSchema({
      type: 'array',
      items: {
        $ref: getSchemaPath(CreateUserDto),
      },
    }),
  })
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @ApiOkResponse({
    schema: generateApiOkSchema({
      $ref: getSchemaPath(CreateUserDto),
    }),
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiOkResponse({
    schema: generateApiOkSchema({
      $ref: getSchemaPath(CreateUserDto),
    }),
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiNoContentResponse()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
