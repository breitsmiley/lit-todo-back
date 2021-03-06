import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class UserModelGql {
    @Field(type => ID)
    id: number;

    @Field()
    email: string;


    // @Field(type => ID)
    // ttt?: number;

    @Field()
    password?: string;
}