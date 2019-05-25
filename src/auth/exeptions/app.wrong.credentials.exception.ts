import { HttpException, HttpStatus } from "@nestjs/common";

export class AppWrongCredentialsException extends HttpException {
    constructor() {
        super('Wrong email or password', HttpStatus.UNAUTHORIZED);
    }
}