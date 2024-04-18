import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { StockDecreaseLog } from './product/entities/stock-decreate-log.entity';

@Module({
  imports: [    
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'micro_product',
    username: 'postgres',
    password: 'postgres',
    entities: [Product, StockDecreaseLog],
    synchronize: true, 
  }),
  ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
