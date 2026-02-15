import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  /**
   * Create a new user in the database
   * @param createUserDto - User data to create
   * @returns Created user entity
   */
  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  /**
   * Retrieve all users from the database
   * @returns List of all users
   */
  findAll() {
    return `This action returns all users`;
  }

  /**
   * Find a single user by ID
   * @param id - User ID
   * @returns User with the specified ID
   */
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  /**
   * Update an existing user
   * @param id - User ID to update
   * @param updateUserDto - Updated user data
   * @returns Update confirmation
   */
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  /**
   * Remove a user from the database
   * @param id - User ID to remove
   * @returns Deletion confirmation
   */
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  /**
   * Find a user by their email address
   * @param email - User's email address
   * @returns User entity if found, null otherwise
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
