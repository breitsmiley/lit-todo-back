import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from './config/config.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigService} from "./config/config.service";
import {UserModule} from './user/user.module';
import {UserRepository} from "./user/repository";

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: ConfigService,
        }),
        UserModule,
        TypeOrmModule.forFeature([UserRepository])
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
