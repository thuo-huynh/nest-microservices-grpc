import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class StockDecreaseLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  /*
   * Relation IDs
   */

  @Column({ type: 'integer' })
  public orderId!: number;

  /*
   * Many-To-One Relationships
   */

  @ManyToOne(() => Product, (product) => product.stockDecreaseLogs)
  public product: Product;
}
