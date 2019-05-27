import {Injectable} from '@nestjs/common';
import { ConfigService } from "./modules/config/config.service";
import { UserRepository } from "./db/repository";

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
