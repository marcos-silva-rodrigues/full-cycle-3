import { Product } from 'src/products/entities/product.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from './order.entity';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @Column()
  order_id: string;

  @ManyToOne(() => Order, (ordem) => ordem.items)
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;

  @BeforeInsert()
  generateId() {
    if (this.id) {
      return;
    }
    this.id = uuid();
  }
}
