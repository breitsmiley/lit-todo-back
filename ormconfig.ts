import {ConfigService} from "./src/config/config.service";

const configService = new ConfigService('.env');
const config = configService.createTypeOrmOptions();
export = config;