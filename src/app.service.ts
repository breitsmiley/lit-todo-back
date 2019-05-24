import {Injectable} from '@nestjs/common';
import {ConfigService} from "./config/config.service";

@Injectable()
export class AppService {
    constructor(configService: ConfigService) {
    }

    getHello(): string {
        return 'Hello World!';
    }
}
