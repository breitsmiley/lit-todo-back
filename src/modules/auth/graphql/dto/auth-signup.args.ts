import { IsString, IsEmail, IsDefined, IsNotEmpty } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class AuthSignupArgs {
    @Field()
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string;
}