import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from "./auth.controller";
import { ConfigService } from "../config/config.service";
import { AuthResolver } from "./auth.resolver";


@Module({
    imports: [
        PassportModule.registerAsync({
            useExisting: ConfigService,
        }),
        JwtModule.registerAsync({
            useExisting: ConfigService,
        }),
        UserModule,
    ],

    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        AuthResolver
    ],
    exports: [PassportModule, AuthService],
})
export class AuthModule {
}
