import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { AppLogger } from "../modules/utils/logger/app-logger";

interface ErrorResponseData {
  statusCode: number;
  message: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private logger: AppLogger) {
    this.logger.setContext("ERROR");
  }

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const data: ErrorResponseData = {
      statusCode: 500,
      message: "",
    };

    // If exception already handled
    if (exception.response) {
      const { statusCode = data.statusCode, message = data.message } = exception.response;

      data.statusCode = statusCode;
      data.message = Array.isArray(message) ? message[0] : message;
    } else {
      data.message = exception.message || "Internal Server Error";
    }

    this.logger.error(exception.stack);

    res.status(data.statusCode).json(data);
  }
}
