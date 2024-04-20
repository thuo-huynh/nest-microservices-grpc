import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { CreateOrderRequest } from "./dto/create-order.request";
import { CreateOrderResponse } from "./dto/create-order.response";
import { CreateProductRequest } from "./dto/create-product-request.dto";
import { CreateProductResponse } from "./dto/create-product-response.dto";
import { FindOneResponse } from "./dto/find-one-response.dto";
import { FindOneRequest } from "./dto/find-one-request.dto";
import { DecreaseStockRequest } from "./dto/decrease-stock.request";
import { DecreaseStockResponse } from "./dto/decrease-stock.respone";

export interface OrderServiceClient {
    createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse>;
}
  
export interface OrderServiceController {
    createOrder(request: CreateOrderRequest): Promise<CreateOrderResponse> | Observable<CreateOrderResponse> | CreateOrderResponse;
}
  
export function OrderServiceControllerMethods() {
    return function (constructor: Function) {
        const grpcMethods: string[] = ['createOrder'];
        for (const method of grpcMethods) {
            const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcMethod('OrderService', method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods: string[] = [];
        for (const method of grpcStreamMethods) {
            const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcStreamMethod('OrderService', method)(constructor.prototype[method], method, descriptor);
        }
    };
}


export interface ProductServiceClient {
    createProduct(request: CreateProductRequest): Observable<CreateProductResponse>;
  
    findOne(request: FindOneRequest): Observable<FindOneResponse>;
  
    decreaseStock(request: DecreaseStockRequest): Observable<DecreaseStockResponse>;
  }
  
  export interface ProductServiceController {
    createProduct(
      request: CreateProductRequest,
    ): Promise<CreateProductResponse> | Observable<CreateProductResponse> | CreateProductResponse;
  
    findOne(request: FindOneRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;
  
    decreaseStock(
      request: DecreaseStockRequest,
    ): Promise<DecreaseStockResponse> | Observable<DecreaseStockResponse> | DecreaseStockResponse;
  }
  
  export function ProductServiceControllerMethods() {
    return function (constructor: Function) {
      const grpcMethods: string[] = ['createProduct', 'findOne', 'decreaseStock'];
      for (const method of grpcMethods) {
        const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
        GrpcMethod('ProductService', method)(constructor.prototype[method], method, descriptor);
      }
      const grpcStreamMethods: string[] = [];
      for (const method of grpcStreamMethods) {
        const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
        GrpcStreamMethod('ProductService', method)(constructor.prototype[method], method, descriptor);
      }
    };
  }