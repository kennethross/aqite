import { Allow } from "class-validator";

export class UserCreateData {
  @Allow()
  name!: string;

  @Allow()
  email!: string;
  
  @Allow()
  hobbies: string[];
  
  @Allow()
  skillSets!: string[];
}