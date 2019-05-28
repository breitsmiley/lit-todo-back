import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { AuthOptionsFactory, IAuthModuleOptions } from "@nestjs/passport";

export interface EnvConfig {
    [key: string]: any;
}

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory, JwtOptionsFactory, AuthOptionsFactory {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test', 'provision'])
                .default('development'),
            // PORT: Joi.number().default(3000),
            API_AUTH_ENABLED: Joi.boolean().required(),

            APP_DB_HOST: Joi.string().required(),
            APP_DB_PORT: Joi.number().required(),
            APP_DB_USERNAME: Joi.string().required(),
            APP_DB_PASSWORD: Joi.string().required(),
            APP_DB_DATABASE: Joi.string().required(),

            APP_JWT_SECRET_KEY: Joi.string().required(),
            APP_JWT_TOKEN_TTL: Joi.number().required(),
            APP_JWT_TOKEN_NAME: Joi.string().required(),
        });

        const {error, value: validatedEnvConfig} = Joi.validate(
            envConfig,
            envVarsSchema,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    get isApiAuthEnabled(): boolean {
        return Boolean(this.envConfig.API_AUTH_ENABLED);
    }

    get jwtSecretKey(): string {
        return this.envConfig.APP_JWT_SECRET_KEY;
    }

    get jwtTokenName(): string {
        return this.envConfig.APP_JWT_TOKEN_NAME;
    }

    get jwtTokenTTL(): number {
        return this.envConfig.APP_JWT_TOKEN_TTL;
    }

    /**
     * TYPEORM async configuration
     * https://docs.nestjs.com/techniques/database
     */
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.envConfig.APP_DB_HOST,
            port: this.envConfig.APP_DB_PORT,
            username: this.envConfig.APP_DB_USERNAME,
            password: this.envConfig.APP_DB_PASSWORD,
            database: this.envConfig.APP_DB_DATABASE,
            keepConnectionAlive: true,
            entities: [
                // TODO https://github.com/typeorm/typeorm/issues/420#issuecomment-393316360
                // Project, User,ProjectColor, Task
                __dirname + '/../../modules/**/entity/*.entity.{js,ts}',
            ],
            migrations: [
                __dirname + '/../../migration/*.{js,ts}'
            ],
            cli: {
                migrationsDir: 'src/migration'
            },
            synchronize: false,
        };
    }


    createJwtOptions(): JwtModuleOptions {

        return {
            secret: this.jwtSecretKey,
            signOptions: {
                expiresIn: this.jwtTokenTTL,
            },

        }

    }

    createAuthOptions(): IAuthModuleOptions {
        return {defaultStrategy: 'jwt'}
    }

}
