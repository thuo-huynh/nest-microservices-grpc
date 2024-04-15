import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_PACKAGE_NAME, ORDER_SERVICE_NAME } from './order.constant';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: ORDER_PACKAGE_NAME,
          protoPath: 'protos/order.proto',
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [OrderController],
})
export class OrderModule {}
