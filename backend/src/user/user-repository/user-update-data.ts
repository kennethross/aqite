import { PartialType } from '@nestjs/swagger';
import { UserCreateData } from './user-create-data';

export class UserUpdateData extends PartialType(UserCreateData) {}
