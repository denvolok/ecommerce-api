import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { QueryFailedError } from "typeorm/index";

interface ErrorResponseData {
  statusCode: number;
  message: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
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
      if (exception instanceof QueryFailedError) {
        data.statusCode = 500;
        data.message = exception.message;
      }
    }

    res.status(data.statusCode).json(data);
  }
}
