import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import {AppService} from './app.service';
import { JwtAuthGuard } from "./modules/auth/guards/jwt-auth.guard";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('data')
    @UseGuards(JwtAuthGuard)
    // @UseGuards(AuthGuard() )
    findAll() {
        // this route is restricted by AuthGuard
        // JWT strategy
        return 'OK - this route is restricted by AuthGuard';
    }
}
