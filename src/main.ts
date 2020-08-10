import * as dotenv from "dotenv";
// TODO: replace with nest variant
dotenv.config();

import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { GlobalExceptionFilter } from "./utils/global-exception.filter";
import { SwaggerConfig } from "./config/swaggerConfig";
import { AppLogger } from "./modules/utils/logger/app-logger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new AppLogger() });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(AppLogger)));

  SwaggerConfig.init(app);

  await app.listen(3000);
}

bootstrap();
