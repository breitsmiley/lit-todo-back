import { EntityRepository, Repository } from 'typeorm';
import { Project } from "../entity";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {

}