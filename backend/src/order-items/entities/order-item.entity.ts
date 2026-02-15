import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/products/entities/product.entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0})
    price: number;

    @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE'})
    order: Order

    @ManyToOne(() => Product, (product) => product.orderItems)
    product: Product
}
