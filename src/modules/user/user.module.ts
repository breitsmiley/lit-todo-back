import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from './user.service';
import { UserRepository } from "./repository";
import { UserResolver } from "./user.resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository])
    ],
    providers: [
        UserService,
        UserResolver, 
    ],
    exports: [UserService]
})
export class UserModule {
}
