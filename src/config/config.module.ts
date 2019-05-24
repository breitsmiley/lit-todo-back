import {Global, Module} from '@nestjs/common';
import {ConfigService} from './config.service';

@Global()
@Module({
    providers: [
        {
            provide: ConfigService,
            // useValue: new ConfigService(`${process.env.NODE_ENV}.env`),
            useValue: new ConfigService(`.env`),
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule {
}
