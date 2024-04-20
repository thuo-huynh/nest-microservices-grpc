import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { GrpcMethod } from '@nestjs/microservices';
import { ORDER_SERVICE_NAME } from './order.constant';
import { CreateOrderRequest } from './dto/create-order.request';
import { CreateOrderResponse } from './dto/create-order.response';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @GrpcMethod(ORDER_SERVICE_NAME, 'CreateOrder')
  private async createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    return this.orderService.createOrder(data);
  }
}
