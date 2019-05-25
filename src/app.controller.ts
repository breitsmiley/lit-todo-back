import { Controller, Get, UseGuards } from '@nestjs/common';
import {AppService} from './app.service';
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";

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
    findAll() {
        // this route is restricted by AuthGuard
        // JWT strategy
        return 'OK - this route is restricted by AuthGuard';
    }
}
