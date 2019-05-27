import { Body, Controller, Get, Post, UseGuards, Request, ValidationPipe, UsePipes, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from "./dto/auth-login.dto";
import { ConfigService } from "../config/config.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {
    }

    @Post('login')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async login(@Request() request, @Body() requestObj: AuthLoginDto): Promise<any> {
        const token = await this.authService.login(requestObj.email, requestObj.password);
        return {
            [this.configService.jwtTokenName]: token
        }
    }
}
