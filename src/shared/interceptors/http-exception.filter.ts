import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { ErrorMessageEnum } from '../errors/error-message';

interface ResponseParams {
  body?: object | string;
  protocol?: 'http';
  stacktrace?: string;
  status?: number;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = ErrorMessageEnum.INTERNAL_ERROR;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const stacktrace = exception?.stack || '';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    }

    const { method, url, params, body } = request;
    const responseAux: ResponseParams = {
      protocol: 'http',
      body: message,
      stacktrace,
      status,
    };

    console.error(`Error on request `, {
      endpoint_type: method,
      endpoint_url: url,
      reqParams: {
        params,
        body,
      },
      response: responseAux,
    });

    response
      .status(status)
      .json({ message, stacktrace: status == 500 ? stacktrace : undefined });
  }
}
