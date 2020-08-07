import { CrudConfigService } from "@nestjsx/crud";
import { crudGlobalConfig } from "./config/crudGlobalConfig";
import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dbConfig } from "./config/dbConfig";
import { AuthModule } from "./modules/auth/auth.module";

CrudConfigService.load(crudGlobalConfig);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [__dirname + "/modules/**/*/*.entity{.js,.ts}"],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
