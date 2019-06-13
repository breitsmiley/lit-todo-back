import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from "@nestjs/common";
import { TodoService } from "../../todo.service";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { TodoProjectModelGql } from "../model";

@Resolver(of => TodoProjectModelGql)
export class TodoProjectResolver {
    constructor(private readonly todoService: TodoService) {}


    @Query(returns => [TodoProjectModelGql])
    @UseGuards(JwtAuthGuard)
    projects(): Promise<TodoProjectModelGql[]> {

        return this.todoService.getAllProjects();
    }

}
