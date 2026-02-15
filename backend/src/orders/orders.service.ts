import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
        @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
        @InjectRepository(Product)
    private productsRepository: Repository<Product> 
  ){}

  async create(createOrderDto: CreateOrderDto, user: User) {
    const newOrder = this.ordersRepository.create({
      user: user,
      status: 'PENDING',
      orderDate: new Date()
    });
    const savedOrder = await this.ordersRepository.save(newOrder);

    for (const itemDto of createOrderDto.items) { // Végigmegyünk a listán
      const product = await this.productsRepository.findOneBy({ id: itemDto.productId });

      if (!product) {
         // Ha nincs ilyen termék, inkább dobjunk hibát, mintsem üresen mentsük!
         throw new BadRequestException(`Nincs ilyen termék: ${itemDto.productId}`);
      }

      const orderItem = this.orderItemsRepository.create({
        order: savedOrder,
        product: product,
        quantity: itemDto.quantity, // <--- Ez volt NULL a hibánál!
        price: product.price
      });

      await this.orderItemsRepository.save(orderItem);
    }

    return this.ordersRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['items', 'items.product'],
    });
  }

  findAll() {
    return this.ordersRepository.find({
      relations: ['items', 'items.product', 'user'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
