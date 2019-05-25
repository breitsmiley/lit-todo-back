import {  Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from "../user/user.service";
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from "../user/entity";
import { AppWrongCredentialsException } from "./exeptions";
import { ConfigService } from "../config/config.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async login(email: string, plainPassword: string): Promise<string> {

        const user = await this.userService.getByEmail(email);

        if (!user) {
            throw new AppWrongCredentialsException();
        }

        const bcrypt = require('bcrypt');

        const isMatch = await bcrypt.compare(plainPassword, user.password);

        if (!isMatch) {
            throw new AppWrongCredentialsException();
        }

        return this.createToken(user);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userService.getByEmail(payload.email);
    }

    private createToken(user: User) {
        const userJWT: JwtPayload = { email: user.email };

        return this.jwtService.sign(userJWT, {
            expiresIn: this.configService.jwtTokenTTL
        });
    }
}
