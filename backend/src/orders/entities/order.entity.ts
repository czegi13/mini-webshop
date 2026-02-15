import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "src/users/entities/user.entity";

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

}