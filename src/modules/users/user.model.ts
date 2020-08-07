import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm/index";
import { EntityBase } from "../../utils/types";
import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";
import { CrudValidationGroups } from "@nestjsx/crud";
import * as bcrypt from "bcrypt";

const { UPDATE } = CrudValidationGroups;

export enum UserRole {
  ADMIN = "admin",
  EMPLOYEE = "employee",
  CLIENT = "client",
}

@Entity("users")
export class User extends EntityBase {
  @Column()
  @IsNotEmpty({ always: true })
  @IsOptional({ groups: [UPDATE] })
  public firstName: string;

  @Column()
  @IsNotEmpty({ always: true })
  @IsOptional({ groups: [UPDATE] })
  public lastName: string;

  @Column({ unique: true })
  @IsEmail()
  @IsOptional({ groups: [UPDATE] })
  public email: string;

  @Column()
  @IsNotEmpty({ always: true })
  @IsOptional({ groups: [UPDATE] })
  @Length(6)
  public password: string;

  @Column({ type: "enum", enum: UserRole })
  @IsNotEmpty({ always: true })
  @IsOptional({ groups: [UPDATE] })
  public role: UserRole;

  //

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    const salt = await bcrypt.genSalt(10);

    // If creating a user or updating "password" field
    if (this.password) {
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
