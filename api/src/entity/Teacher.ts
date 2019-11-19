import {
  ChildEntity,
} from 'typeorm';
import { User } from './User';


@ChildEntity('teacher')
export class Student extends User {


}
