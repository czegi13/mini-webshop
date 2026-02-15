import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "src/order-items/entities/order-item.entity";

@Entity()
export class Product{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column({nullable: true})
    description: string

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[]
}