import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepositoryService } from './user-repository/user-repository.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepositoryService) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepo.createUser(createUserDto);
  }

  findAll() {
    return this.userRepo.getAllUsers();
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.userRepo.updateUser({ id, update: updateUserDto });
  }

  remove(id: string) {
    return this.userRepo.remove({ id });
  }
}
