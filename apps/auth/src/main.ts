import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthModule } from './auth.module';
import { AUTH_PACKAGE_NAME } from './auth/auth.constant';
import { HttpExceptionFilter } from 'lib/common/filter/http-exception.filter';

async function bootstrap() {

  const app: INestMicroservice = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: AUTH_PACKAGE_NAME,
      protoPath: join('protos/auth.proto'),
    },
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}
bootstrap();
