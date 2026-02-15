import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order> 
  ){}

  async create(createOrderDto: CreateOrderDto, user: User){
    const newOrder = await this.ordersRepository.create({
      ...createOrderDto,
      orderDate: new Date(),
      user: user,
      status: 'PENDING'
    })

    return await this.ordersRepository.save(newOrder);
  } 

  findAll(){
    this.ordersRepository.find();
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
