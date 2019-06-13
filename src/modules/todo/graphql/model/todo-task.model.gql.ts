import { Field, ID, ObjectType } from 'type-graphql';
import {TodoColorModelGql} from "./todo-color.model.gql";

@ObjectType()
export class TodoTaskModelGql {
    @Field(type => ID)
    id: number;

    @Field()
    createdAt: Date;

    @Field()
    status: string;

    @Field()
    name: string;

    @Field()
    priority: string;

    @Field(type => TodoColorModelGql)
    color: TodoColorModelGql;

    // @Field(type => [TodoColorModelGql])
    // tasks: TodoColorModelGql;

}
