import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { CreateOrderRequest } from './dto/create-order.request';
import { Observable } from 'rxjs';
import { CreateOrderResponse } from './dto/create-order.response';

export interface OrderServiceClient {
  createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse>;
}

export interface OrderServiceController {
  createOrder(
    request: CreateOrderRequest,
  ):
    | Promise<CreateOrderResponse>
    | Observable<CreateOrderResponse>
    | CreateOrderResponse;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createOrder'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('OrderService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('OrderService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}
