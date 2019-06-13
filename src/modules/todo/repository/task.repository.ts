import { EntityRepository, Repository } from 'typeorm';
import { Task } from "../entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

}