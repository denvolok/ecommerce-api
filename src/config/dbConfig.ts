import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const dbConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
};
