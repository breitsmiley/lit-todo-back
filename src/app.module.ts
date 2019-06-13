import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from "./modules/config/config.service";
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserRepository } from "./modules/user/repository";
import { TodoModule } from "./modules/todo/todo.module";
import { DateScalar } from "./common/graphql/scalars";


@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: ConfigService,
        }),
        GraphQLModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: ConfigService, 
        }),        
        AuthModule,
        UserModule,
        TodoModule,
        // ProjectModule,
        // TaskModule,
        TypeOrmModule.forFeature([UserRepository]),
        
    ],
    controllers: [AppController],
    providers: [
        AppService,
        DateScalar
    ],
})
export class AppModule {
}
