import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserCreateData } from './user-create-data';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UserUpdateData } from './user-update-data';

@Injectable()
export class UserRepositoryService extends PrismaClient {
  constructor() {
    super();
  }

  async createUser(data: UserCreateData) {
    const _data = plainToInstance(UserCreateData, data);
    await validate(_data, { whitelist: true });
    return await this.user.create({ data:_data });
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

  async updateUser(data: { id: string; update: UserUpdateData }) {
    const { id, update } = data;

    const _data = plainToInstance(UserCreateData, update);
    await validate(_data, { whitelist: true });

    return await this.user.update({
      select: {
        id: true,
      },
      where: { id },
      data: _data,
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
