import { CrudConfigService } from "@nestjsx/crud";
import { crudGlobalConfig } from "./config/crudGlobalConfig";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dbConfig } from "./config/dbConfig";
import { AuthModule } from "./modules/auth/auth.module";
import { LoggerModule } from "./modules/utils/logger/logger.module";
import { ApiModule } from "./api.module";

CrudConfigService.load(crudGlobalConfig);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [__dirname + "/modules/**/*/*.entity{.js,.ts}"],
    }),
    LoggerModule,
    AuthModule,
    ApiModule,
  ],
})
export class AppModule {}
