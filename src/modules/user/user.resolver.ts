import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { UserService } from './user.service';
import { UsersArgs } from "./graphql/dto/user.args";
import { UserModelGql } from "./graphql/model/user.model.gql";

const pubSub = new PubSub();

@Resolver(of => UserModelGql)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(returns => UserModelGql)
    async user(@Args('id') id: number): Promise<UserModelGql> {
        const userModelGql = await this.userService.findOneById(id);
        if (!userModelGql) {
            throw new NotFoundException(id);
        }
        return userModelGql;
    }

    @Query(returns => [UserModelGql])
    users(@Args() usersArgs:UsersArgs): Promise<UserModelGql[]> {
        return this.userService.findAll(usersArgs);
    }

}