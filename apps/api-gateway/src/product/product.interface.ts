import { Observable } from 'rxjs';
import { CreateProductRequest } from './dto/create-product.request';
import { CreateProductResponse } from './dto/create-product.response';
import { DecreaseStockRequest } from './dto/decrease-stock.request';
import { DecreaseStockResponse } from './dto/decrease-stock.respone';
import { FindOneRequest } from './dto/find-one.request';
import { FindOneResponse } from './dto/find-one.response';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';

export interface ProductServiceClient {
  createProduct(
    request: CreateProductRequest,
  ): Observable<CreateProductResponse>;

  findOne(request: FindOneRequest): Observable<FindOneResponse>;

  decreaseStock(
    request: DecreaseStockRequest,
  ): Observable<DecreaseStockResponse>;
}

export interface ProductServiceController {
  createProduct(
    request: CreateProductRequest,
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse;

  findOne(
    request: FindOneRequest,
  ): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  decreaseStock(
    request: DecreaseStockRequest,
  ):
    | Promise<DecreaseStockResponse>
    | Observable<DecreaseStockResponse>
    | DecreaseStockResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createProduct', 'findOne', 'decreaseStock'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('ProductService', method)(
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
      GrpcStreamMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}
