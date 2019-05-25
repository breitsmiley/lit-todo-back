import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from "../user/user.service";
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login() {
        // In the real-world app you shouldn't expose this method publicly
        // instead, return a token once you verify user credentials
        // const user: JwtPayload = { email: 'user@email.com' };
        // return this.jwtService.sign(user);

        return this.createToken();
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userService.findOneByEmail(payload.email);
    }

    private createToken() {
        const user: JwtPayload = { email: 'test@email.com' };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: 3600,
            accessToken,
        };
    }
}
