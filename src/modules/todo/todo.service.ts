import { Injectable } from '@nestjs/common';
import { ColorRepository, ProjectRepository, TaskRepository } from "./repository";
import { Color, Project, Task } from "./entity";

@Injectable()
export class TodoService {

    constructor(
        private readonly colorRepository: ColorRepository,
        private readonly projectRepository: ProjectRepository,
        private readonly taskRepository: TaskRepository,
    ) {
    }

    async getAllColors(): Promise<Color[]> {
        return this.colorRepository.find();
    }

    async getAllProjects(): Promise<Project[]> {
        return this.projectRepository.find();
    }
    
    async getAllTasks(): Promise<Task[]> {
        return this.taskRepository.find();
    }

}
