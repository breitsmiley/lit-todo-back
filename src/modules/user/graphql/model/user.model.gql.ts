import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class UserModelGql {
    @Field(type => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    createdAt: Date;

    @Field(type => ID)
    ttt?: number;
}