import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from "jsonwebtoken";
import {GqlExecutionContext} from "@nestjs/graphql";
import {AuthService} from "../auth.service";
import {ConfigService} from "../../config/config.service";
import {Observable} from "rxjs";
import {ExecutionContextHost} from "@nestjs/core/helpers/execution-context-host";
import { AuthenticationError } from 'apollo-server-core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
    // canActivate(context: ExecutionContext) {
    //     const ctx = GqlExecutionContext.create(context);
    //     const { req } = ctx.getContext();
    //     // console.log(req);
    //
    //     return super.canActivate(new ExecutionContextHost([req]));
    // }
    //
    // handleRequest(err: any, user: any) {
    //     console.log('handleRequest', err,user);
    //     if (err || !user) {
    //         throw err || new AuthenticationError('GqlAuthGuard');
    //     }
    //     return user;
    // }
}
