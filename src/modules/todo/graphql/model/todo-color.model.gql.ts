import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class TodoColorModelGql {
    @Field(type => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    code: string;
}