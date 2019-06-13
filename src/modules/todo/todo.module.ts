import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColorRepository, ProjectRepository, TaskRepository } from "./repository";
import { DateScalar } from "../../common/graphql/scalars";
import { TodoService } from "./todo.service";
import { TodoColorResolver, TodoProjectResolver, TodoTaskResolver } from "./graphql/resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ColorRepository,
            ProjectRepository,
            TaskRepository,
        ])
    ],
    providers: [
        TodoService,
        TodoColorResolver,
        TodoProjectResolver,
        TodoTaskResolver,
        DateScalar,
    ],
    exports: [TodoService]
})
export class TodoModule {
}
