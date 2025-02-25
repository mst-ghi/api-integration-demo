import { Response } from 'express';
import { Prisma } from '@prisma/client';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(InternalServerErrorException, Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class InternalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException ? exception.getResponse() : 'Ooh! The request encountered an error';

    response.status(status).json({
      status: status,
      message: message,
    });
  }
}
