import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [    ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      API_GATEWAY_PORT: Joi.number().required(),
      API_GATEWAY_HOST: Joi.string().required(),
    }),
  }),OrderModule, ProductModule, AuthModule],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
