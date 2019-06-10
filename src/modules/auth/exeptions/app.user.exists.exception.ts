import { HttpException, HttpStatus } from "@nestjs/common";

export class AppUserExistsException extends HttpException {
    constructor(email: string) {
        super(`User ${email} already exists`, HttpStatus.CONFLICT);
    }
}