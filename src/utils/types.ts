import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm/index";
import { UseGuards } from "@nestjs/common";
import { ApiGuard } from "../modules/auth/api.guard";
import { JwtAuthGuard } from "../modules/auth/jwt-auth.guard";

export abstract class EntityBase {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ name: "created_at" })
  public created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updated_at: Date;

  @VersionColumn({ name: "version" })
  public version: string;
}

@UseGuards(JwtAuthGuard, ApiGuard)
export abstract class ApiController {}
