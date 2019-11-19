import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Organization } from './Organization';

@Entity('campus')
export class Campus {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  slug: string;

  @Column()
  name: string;

  @OneToMany(() => Organization, organization => organization.campus)
  organizations: Organization[];
}
