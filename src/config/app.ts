import * as dotenv from "dotenv";
import process from "process";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import connectRedis from "connect-redis";
import session from "express-session";
import redis from "redis";
import passport from "passport";
import { Sequelize } from "sequelize";
import logger from "../utils/logger";

dotenv.config();

class App {
  app: express.Application;

  constructor() {
    const { port = 8080 } = process.env;
    this.app = express();

    this.app.set("port", port);
  }

  async init(): Promise<void> {
    try {
      await Promise.all([
        this.setupDB(),
        this.setupAuth(),
        this.setupSession(),
        this.setupMiddleware(),
      ]);
    } catch (e) {
      logger.error(e);
      process.exit(1);
    }
  }

  async run(): Promise<void> {
    const port = this.app.get("port");

    this.app.listen(port, (): void => {
      logger.info(`Server is running on port ${port}`);
    });
  }

  private async setupDB(): Promise<void> {
    const { DB_USER, DB_PASS, DB_NAME } = process.env;
    const dbUri = `postgres://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}`;

    const sequelize = new Sequelize(dbUri);
    await sequelize.authenticate();

    logger.info("Database connected");
    this.app.set("sequelize", sequelize);
  }

  private async setupAuth(): Promise<void> {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private async setupSession(): Promise<void> {
    const { SESSION_SECRET = "" } = process.env;

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

    this.app.use(
      session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
      })
    );

    return new Promise((resolve, reject) => {
      redisClient.on("connect", (): void => {
        logger.info("Redis store connected");
        resolve();
      });

      redisClient.on("error", (err): void => {
        reject(err);
      });
    });
  }

  private async setupMiddleware(): Promise<void> {
    this.app.use(
      helmet({
        permittedCrossDomainPolicies: true,
        referrerPolicy: true,
      })
    );

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }
}

export default App;
