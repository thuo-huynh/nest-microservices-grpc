import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { GrpcMethod } from '@nestjs/microservices';
import { PRODUCT_SERVICE_NAME } from './product.constant';
import { CreateProductResponse } from './dto/create-product-response.dto';
import { CreateProductRequest } from './dto/create-product-request.dto';
import { FindOneRequest } from './dto/find-one-request.dto';
import { FindOneResponse } from './dto/find-one-response.dto';
import { DecreaseStockRequest } from './dto/decrease-stock.request';
import { DecreaseStockResponse } from './dto/decrease-stock.respone';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreateProduct')
  private createProduct(payload: CreateProductRequest): Promise<CreateProductResponse> {
    console.log("🚀 ~ ProductController ~ createProduct ~ payload:", payload)
    return this.productService.createProduct(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindOneRequest): Promise<FindOneResponse> {
    return this.productService.findOne(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'DecreaseStock')
  private decreaseStock(payload: DecreaseStockRequest): Promise<DecreaseStockResponse> {
    return this.productService.decreaseStock(payload);
  }
}
