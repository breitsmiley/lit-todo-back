import { IsString, IsEmail, IsDefined, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}