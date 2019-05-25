import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from "jsonwebtoken";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        // https://stackoverflow.com/questions/53296157/how-to-refresh-token-in-nestjs
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (info instanceof TokenExpiredError) {
            // do stuff when token is expired
            console.log('token expired');
        }

        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}