import { HttpException, HttpStatus } from '@nestjs/common';

export const throwForbidden = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.FORBIDDEN,
      message: msg || 'You do not have sufficient access for this request',
    },
    HttpStatus.FORBIDDEN,
  );
};

export const throwUnAuthorized = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.UNAUTHORIZED,
      message: msg || 'Authorization information is not specified in the request',
    },
    HttpStatus.UNAUTHORIZED,
  );
};

export const throwLimitedUnAuthorized = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.UNAUTHORIZED,
      message: msg || 'Your access is limited, please contact the operator',
    },
    HttpStatus.UNAUTHORIZED,
  );
};

export const throwBadRequest = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      message: msg || 'Invalid request',
    },
    HttpStatus.BAD_REQUEST,
  );
};

export const throwNotFound = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.NOT_FOUND,
      message: msg || 'Data not found',
    },
    HttpStatus.NOT_FOUND,
  );
};

export const throwMethodNotAllowed = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.METHOD_NOT_ALLOWED,
      message: msg || 'Access method is not allowed',
    },
    HttpStatus.METHOD_NOT_ALLOWED,
  );
};

export const throwInternalServerError = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: msg || 'Internal server error',
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};

export const throwServiceUnAvailable = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.SERVICE_UNAVAILABLE,
      message: msg || 'Service is unavailable',
    },
    HttpStatus.SERVICE_UNAVAILABLE,
  );
};

export const throwUnprocessableEntity = (
  errors: { field: string; message: string }[] = [],
  msg: string | null = null,
) => {
  throw new HttpException(
    {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      message: msg || 'The submitted data is not valid',
      errors,
    },
    HttpStatus.UNPROCESSABLE_ENTITY,
  );
};

export const throwInvalidToken = (msg: string | null = null) => {
  throw new HttpException(
    {
      status: HttpStatus.UNAUTHORIZED,
      message: msg || 'Invalid token',
    },
    HttpStatus.UNAUTHORIZED,
  );
};
