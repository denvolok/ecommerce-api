import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm/index";
import { UseGuards } from "@nestjs/common";
import { ApiGuard } from "../modules/auth/api.guard";
import { JwtAuthGuard } from "../modules/auth/jwt-auth.guard";
import { ApiResponseProperty } from "@nestjs/swagger";

export abstract class EntityBase {
  @PrimaryGeneratedColumn()
  @ApiResponseProperty()
  public id: number;

  @CreateDateColumn({ name: "created_at" })
  @ApiResponseProperty()
  public created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @ApiResponseProperty()
  public updated_at: Date;

  @VersionColumn({ name: "version" })
  @ApiResponseProperty()
  public version: string;
}

@UseGuards(JwtAuthGuard, ApiGuard)
export abstract class ApiController {}
