import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { OrderItem } from "src/order-items/entities/order-item.entity";

@Entity()
export class Order{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderDate: Date;

    @Column({default: 'PENDING'})
    status: string;

    @ManyToOne(() => User, (user) => user.orders, {eager: true})
    user: User

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    items: OrderItem[]
}