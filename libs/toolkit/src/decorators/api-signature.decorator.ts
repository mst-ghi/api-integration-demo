import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { applyDecorators, Delete, Get, HttpCode, Post, Put, Version } from '@nestjs/common';

declare type SignatureMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

declare type ApiSignatureType = {
  method?: SignatureMethodType;
  path?: string;
  version?: string;
  status?: number;
  summary: string;
  disable?: boolean;
  isPagination?: boolean;
  isCursorPagination?: boolean;
};

export function ApiSignature({
  method = 'GET',
  path = '',
  version = '1',
  status = 200,
  disable = false,
  isPagination = false,
  isCursorPagination = false,
  summary,
}: ApiSignatureType) {
  let nestMethod = Get;

  switch (method) {
    case 'POST':
      nestMethod = Post;
      break;
    case 'PUT':
      nestMethod = Put;
      break;
    case 'DELETE':
      nestMethod = Delete;
      break;
    default:
      break;
  }

  if (disable) {
    return applyDecorators();
  }

  if (isPagination) {
    return applyDecorators(
      nestMethod(path),
      Version(version),
      HttpCode(status),
      ApiOperation({ summary }),
      ApiQuery({
        name: 'take',
        description: 'The number of items you want to fetched',
        required: false,
      }),
      ApiQuery({
        name: 'page',
        description: 'Page number to fetch',
        required: false,
      }),
    );
  }

  if (isCursorPagination) {
    return applyDecorators(
      nestMethod(path),
      Version(version),
      HttpCode(status),
      ApiOperation({ summary }),
      ApiQuery({
        name: 'take',
        description: 'The number of items you want to fetched',
        required: false,
      }),
      ApiQuery({
        name: 'cursor',
        description: 'Id as cursor query',
        required: false,
      }),
    );
  }

  return applyDecorators(nestMethod(path), Version(version), HttpCode(status), ApiOperation({ summary }));
}
