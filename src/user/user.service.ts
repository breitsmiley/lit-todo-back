import { Injectable } from '@nestjs/common';
import { JwtPayload } from "../auth/interfaces/jwt-payload.interface";
import { UserRepository } from "./repository";
import { User } from "./entity";

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository
    ) {
    }
    //
    // async getByJWT(payload: JwtPayload): Promise<User> {
    //     return this.userRepository.findByEmail(payload.email);
    // }

    async getByEmail(email: string): Promise<User> {
        return this.userRepository.findByEmail(email);
    }

    // async validatePassword(email: string, plainPassword: string): Promise<User> {
    //
    //     const bcrypt = require('bcrypt');
    //
    //     const user = await this.userRepository.findByEmail(email);
    //
    //     if (!user) {
    //         return undefined;
    //     }
    //
    //     const isMatch = await bcrypt.compare(plainPassword, user.password);
    //
    //     return isMatch ? user : undefined;
    // }
}
