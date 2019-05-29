import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class JwtAuthTokenResponseModelGql {
    @Field()
    token: string;
}