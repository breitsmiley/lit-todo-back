import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from './user.service';
import { UserRepository } from "./repository";
import { UserResolver } from "./user.resolver";
import { DateScalar } from "../../common/graphql/scalars";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository])
    ],
    providers: [
        UserService,
        UserResolver, 
        DateScalar
    ],
    exports: [UserService]
})
export class UserModule {
}
