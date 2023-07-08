import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryService } from './user-repository/user-repository.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
  exports: [UserRepositoryService]
})
export class UserModule {}
