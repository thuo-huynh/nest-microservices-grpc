import {
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrderResponse } from './dto/create-order.response';
import { ORDER_SERVICE_NAME } from './order.constant';
import { OrderServiceClient } from './order.interface';
import { CreateOrderRequest } from './dto/create-order.request';

@Controller('order')
export class OrderController implements OnModuleInit {
  private svc: OrderServiceClient;

  @Inject(ORDER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createOrder(
    @Req() req: Request,
  ): Promise<Observable<CreateOrderResponse>> {
    const body: CreateOrderRequest = req.body;

    body.userId = (req as any).user;

    return this.svc.createOrder(body);
  }
}
