import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, TableInheritance, Unique } from 'typeorm';
import { Institution } from './Institution';
import { Campus } from './Campus';
import { User } from './User';
import { Organization } from './Organization';

@Entity("user_organizations")
@Unique(["user", "organization"])
export abstract class UserOrganization {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.userOrganizations)
  user: User;

  @ManyToOne(() => Organization, organization => organization.userOrganizations)
  organization: Organization;
}
