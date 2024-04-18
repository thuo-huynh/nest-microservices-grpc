import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductRequest } from './dto/create-product-request.dto';
import { CreateProductResponse } from './dto/create-product-response.dto';
import { DecreaseStockRequest } from './dto/decrease-stock.request';
import { DecreaseStockResponse } from './dto/decrease-stock.respone';
import { FindOneRequest } from './dto/find-one-request.dto';
import { FindOneResponse } from './dto/find-one-response.dto';
import { Product } from './entities/product.entity';
import { StockDecreaseLog } from './entities/stock-decreate-log.entity';

@Injectable()
export class ProductService {
  
  @InjectRepository(Product)
  private readonly repository: Repository<Product>;

  @InjectRepository(StockDecreaseLog)
  private readonly decreaseLogRepository: Repository<StockDecreaseLog>;

  public async findOne({ id }: FindOneRequest): Promise<FindOneResponse> {
    const product: Product = await this.repository.findOne({ where: { id } });
    if (!product) {
      return { data: null, error: ['Product not found'], status: HttpStatus.NOT_FOUND };
    }
    return { data: product, error: null, status: HttpStatus.OK };
  }

  public async createProduct(payload: CreateProductRequest): Promise<CreateProductResponse> {
    const product: Product = new Product();
    product.name = payload.name;
    product.sku = payload.sku;
    product.stock = payload.stock;
    product.price = payload.price;

    await this.repository.save(product);
    return { id: product.id, error: null, status: HttpStatus.OK };
  }

  public async decreaseStock({ id, orderId }: DecreaseStockRequest): Promise<DecreaseStockResponse> {
    const product: Product = await this.repository.findOne({ select: ['id', 'stock'], where: { id } });
    if (!product) {
      return { error: ['Product not found'], status: HttpStatus.NOT_FOUND };
    } else if (product.stock <= 0) {
      return { error: ['Stock too low'], status: HttpStatus.CONFLICT };
    }

    const isAlreadyDecreased: number = await this.decreaseLogRepository.count({ where: { orderId } });
    if (isAlreadyDecreased) {
      // Idempotence
      return { error: ['Stock already decreased'], status: HttpStatus.CONFLICT };
    }

    await this.repository.update(product.id, { stock: product.stock - 1 });
    await this.decreaseLogRepository.insert({ product, orderId });
    return { error: null, status: HttpStatus.OK };
  }
}
