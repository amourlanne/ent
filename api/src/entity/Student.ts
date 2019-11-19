import {
  ChildEntity,
} from 'typeorm';
import { User } from './User';


@ChildEntity('student')
export class Student extends User {


}
