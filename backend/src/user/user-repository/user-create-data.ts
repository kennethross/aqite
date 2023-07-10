import { Transform } from "class-transformer";
import { Allow } from "class-validator";

export class UserCreateData {
  @Allow()
  name!: string;

  @Allow()
  email!: string;
  
  @Allow()
  @Transform(({ value }) => value === null ? [] : value)
  hobbies: string[];
  
  @Allow()
  @Transform(({ value }) => value === null ? [] : value)
  skillSets: string[];
}