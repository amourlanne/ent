import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Institution } from './Institution';
import { Campus } from './Campus';
import { UserOrganization } from './UserOrganization';

@Entity('organizations')
@Unique(['slug'])
@Unique(["institution", "campus"])
export class Organization {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Institution, institution => institution.organizations)
  institution: Institution;

  @ManyToOne(() => Campus, campus => campus.organizations)
  campus: Campus;

  @Column()
  slug: string;

  @Column()
  name: string;

  @OneToMany(() => UserOrganization, userOrganization => userOrganization.organization)
  userOrganizations: UserOrganization[];
}
