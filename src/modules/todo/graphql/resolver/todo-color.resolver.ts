import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from "@nestjs/common";
import { TodoService } from "../../todo.service";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { TodoColorModelGql } from "../model";

@Resolver(of => TodoColorModelGql)
export class TodoColorResolver {
    constructor(private readonly todoService: TodoService) {}


    @Query(returns => [TodoColorModelGql])
    @UseGuards(JwtAuthGuard)
    colors(): Promise<TodoColorModelGql[]> {

        return this.todoService.getAllColors();
    }

}
