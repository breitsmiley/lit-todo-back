import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserRepository} from "./repository";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    // imports: [TypeOrmModule.forFeature([UserRepository])],
    providers: [UserService]
})
export class UserModule {
}
