import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '../interceptors';
import { ClassSerializerInterceptor } from '@nestjs/common';

export const ClassSerializerProvider = {
  provide: APP_INTERCEPTOR,
  useClass: ClassSerializerInterceptor,
};

export const TransformProvider = {
  provide: APP_INTERCEPTOR,
  useClass: TransformInterceptor,
};
