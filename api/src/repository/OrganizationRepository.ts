import { EntityRepository, FindConditions, ObjectLiteral, Repository } from 'typeorm';
import { Service } from 'typedi';
import { Organization } from '../entity/Organization';

@Service()
@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {

}
