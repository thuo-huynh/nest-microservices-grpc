import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
import { PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME } from './product.constant';
import { ProductController } from './product.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: PRODUCT_PACKAGE_NAME,
          protoPath: 'protos/product.proto',
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
