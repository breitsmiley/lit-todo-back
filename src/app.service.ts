import {Injectable} from '@nestjs/common';
import {ConfigService} from "./config/config.service";
import {UserRepository} from "./user/repository";

@Injectable()
export class AppService {
    constructor(
        configService: ConfigService,
        private readonly userRepository: UserRepository
    ) {
    }

    getHello(): string {
        return 'Hello World!'  + `${this.userRepository.test()}`;
    }
}
