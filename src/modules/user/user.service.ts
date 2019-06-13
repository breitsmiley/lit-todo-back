import { Injectable } from '@nestjs/common';
import { IJwtPayload } from "../auth/interfaces/jwt-payload.interface";
import { User } from "./entity";
import { UserRepository } from "./repository";
import { UserModelGql } from "./graphql/model/user.model.gql";
import { UsersArgs } from "./graphql/dto/user.args";

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

    async addUser(email: string, password: string): Promise<User> {
        return this.userRepository.add(email, password);
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

    // async findOneById(id: number): Promise<UserModelGql> {
    //     return {
    //         id: 1,
    //         name: 'asd',
    //         createdAt: new Date(),
    //     };
    // }

    async findAll(): Promise<UserModelGql[]> {
        return this.userRepository.find();
    }
}
