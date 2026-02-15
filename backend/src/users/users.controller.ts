import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user
   * @param createUserDto - User data from request body
   * @returns Created user
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Get all users
   * @returns List of all users
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Get a single user by ID
   * @param id - User ID from URL parameter
   * @returns User with the specified ID
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  /**
   * Update an existing user
   * @param id - User ID from URL parameter
   * @param updateUserDto - Updated user data from request body
   * @returns Updated user
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  /**
   * Delete a user
   * @param id - User ID from URL parameter
   * @returns Confirmation of deletion
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
