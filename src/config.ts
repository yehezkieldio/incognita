import { IsBoolean, IsInt, IsString, validateSync } from "class-validator";
import * as dotenv from "dotenv";

import { Logger } from "@nestjs/common";

class Configuration {
    private readonly logger = new Logger(Configuration.name);

    @IsBoolean()
    readonly DATABASE_LOGGING = process.env.DATABASE_LOGGING === "true";

    @IsString()
    readonly DATABASE_HOST = process.env.DATABASE_HOST as string;

    @IsInt()
    readonly DATABASE_PORT = Number(process.env.DATABASE_PORT);

    @IsString()
    readonly DATABASE_NAME = process.env.DATABASE_NAME as string;

    @IsString()
    readonly DATABASE_USER = process.env.DATABASE_USER as string;

    @IsString()
    readonly DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;

    @IsBoolean()
    readonly DATABASE_SYNC = process.env.DATABASE_SYNC === "true";

    @IsInt()
    readonly PORT = Number(process.env.PORT);

    @IsString()
    readonly NODE_ENV = process.env.NODE_ENV as string;

    constructor() {
        const errors = validateSync(this);
        if (errors.length) {
            const constraints = errors.map((error) => error.constraints);
            this.logger.error(`Config validation error: ${JSON.stringify(constraints)}`);
            process.exit(1);
        }
    }
}

dotenv.config();
export const Config = new Configuration();
