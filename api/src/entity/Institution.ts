import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Organization } from './Organization';

@Entity('institutions')
export class Institution {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  slug: string;

  @Column()
  name: string;

  @OneToMany(() => Organization, organization => organization.institution)
  organizations: Organization[];
}
