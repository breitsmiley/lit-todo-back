import { Injectable, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver, Subscription } from '@nestjs/graphql';
import { AuthService } from "./auth.service";
import { AuthLoginArgs } from "./graphql/dto/auth-login.args";
import { JwtAuthTokenResponseModelGql } from "./graphql/model/jwt-auth-token-response.model.gql";
import { AuthSignupArgs } from "./graphql/dto/auth-signup.args";

@Resolver(of => JwtAuthTokenResponseModelGql)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {
    }

    @Query(returns => JwtAuthTokenResponseModelGql)
    async login(@Args() loginArgs: AuthLoginArgs) {
        // const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
        // await snooze(5000);
        return {
            token: await this.authService.login(loginArgs.email, loginArgs.password)
        };
    }

    @Mutation(returns => JwtAuthTokenResponseModelGql)
    async signup(@Args() signupArgs: AuthSignupArgs) {
        return {
            token: await this.authService.signup(signupArgs.email, signupArgs.password)
        };
    }

    // @Query(returns => JwtAuthTokenResponseModelGql)
    // async signup(@Args() signupArgs: AuthSignupArgs) {
    //     return {
    //         token: await this.authService.signup(signupArgs.email, signupArgs.password)
    //     };
    // }
}
