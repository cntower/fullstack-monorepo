import { Catch, HttpServer, ArgumentsHost, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { BaseExceptionFilter, HttpAdapterHost, AbstractHttpAdapter } from '@nestjs/core';

@Catch()
export class HttpErrorFilter extends BaseExceptionFilter {
  protected applicationRef?: HttpServer<any, any>; protected httpAdapterHost?: HttpAdapterHost<AbstractHttpAdapter<any, any, any>>;
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    console.log(exception);
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const error = exception instanceof HttpException
      ? exception.getResponse()
      : 'Unknown error';
    const errorResponse = {
      error,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    }
    response.status(status).json(errorResponse);
    Logger.error(`${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'HttpErrorFilter')
  }
  isExceptionObject(err: any): err is Error {
    throw new Error("Method not implemented.");
  }
}