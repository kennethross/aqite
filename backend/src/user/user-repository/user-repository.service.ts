import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepositoryService extends PrismaClient {
  constructor() {
    super();
  }

  async createUser(data: CreateUserDto) {
    return await this.user.create({ data });
  }

  async getAllUsers() {
    return await this.user.findMany({
      where: {
        deleted: false,
      },
    });
  }

  async findOne(id: string) {
    return await this.user.findFirst({
      where: {
        id,
        deleted: false,
      },
    });
  }

  async updateUser(data: { id: string; update: UpdateUserDto }) {
    const { id, update } = data;
    return await this.user.update({
      select: {
        id: true,
      },
      where: { id },
      data: update,
    });
  }

  async remove(data: { id: string }) {
    const { id } = data;
    await this.user.update({
      where: { id },
      data: {
        deleted: true,
      },
    });
  }
}
