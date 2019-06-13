import {NotFoundException, UseGuards} from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { UserService } from './user.service';
import { UsersArgs } from "./graphql/dto/user.args";
import { UserModelGql } from "./graphql/model/user.model.gql";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { User } from "./entity";
import { AuthCurrentUser } from "../auth/auth-current-user.decorator";

@Resolver(of => UserModelGql)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    // @Query(returns => UserModelGql)
    // @UseGuards(JwtAuthGuard)
    // async user(@Args('id') id: number): Promise<UserModelGql> {
    //     const userModelGql = await this.userService.findOneById(id);
    //     if (!userModelGql) {
    //         throw new NotFoundException(id);
    //     }
    //     return userModelGql;
    // }
    //
    /**
     * TODO Example Getting Current User via decorator from JWT strategy class
     * https://github.com/nestjs/graphql/issues/48
     */
    @Query(returns => [UserModelGql])
    @UseGuards(JwtAuthGuard)
    users(@Args() usersArgs:UsersArgs, @AuthCurrentUser() user: User): Promise<UserModelGql[]> {

        console.log(user);
        return this.userService.findAll(); 
    }

}
