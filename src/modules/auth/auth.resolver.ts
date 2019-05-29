import { Injectable, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver, Subscription } from '@nestjs/graphql';
import { AuthService } from "./auth.service";
import { AuthLoginArgs } from "./graphql/dto/auth-login.args";
import { JwtAuthTokenResponseModelGql } from "./graphql/model/jwt-auth-token-response.model.gql";

@Resolver(of => JwtAuthTokenResponseModelGql)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {
    }

    @Query(returns => JwtAuthTokenResponseModelGql)
    async login(@Args() loginArgs: AuthLoginArgs) {
        return {
            token: await this.authService.login(loginArgs.email, loginArgs.password)
        };
    }
}