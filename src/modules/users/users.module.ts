import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.model";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
