import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from "@nestjs/common";
import { TodoService } from "../../todo.service";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { TodoTaskModelGql } from "../model";

@Resolver(of => TodoTaskModelGql)
export class TodoTaskResolver {
    constructor(private readonly todoService: TodoService) {}


    @Query(returns => [TodoTaskModelGql])
    @UseGuards(JwtAuthGuard)
    tasks(): Promise<TodoTaskModelGql[]> {

        return this.todoService.getAllTasks();
    }

}
