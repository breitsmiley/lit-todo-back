import {  Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from "../user/user.service";
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { AppWrongCredentialsException } from "./exeptions";
import { ConfigService } from "../config/config.service";
import { User } from "../user/entity";

/**
 * https://gist.github.com/zmts/802dc9c3510d79fd40f9dc38a12bccfc
 * https://medium.com/@maison.moa/using-jwt-json-web-tokens-to-authorize-users-and-protect-api-routes-3e04a1453c3e
 */
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

    async signup(email: string, plainPassword: string): Promise<string> {

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

    async validateUser(payload: IJwtPayload): Promise<any> {
        return await this.userService.getByEmail(payload.email);
    }

    private createToken(user: User) {
        const userJWT: IJwtPayload = { 
            id: user.id,
            email: user.email,
        };

        return this.jwtService.sign(userJWT, {
            expiresIn: this.configService.jwtTokenTTL
        });
    }
}
