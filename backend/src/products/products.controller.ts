import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Create a new product
   * @param createProductDto - Product data from request body
   * @returns Created product
   */
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  /**
   * Get all products
   * @returns List of all products
   */
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  /**
   * Get a single product by ID
   * @param id - Product ID from URL parameter
   * @returns Product with the specified ID
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  /**
   * Update an existing product
   * @param id - Product ID from URL parameter
   * @param updateProductDto - Updated product data from request body
   * @returns Updated product
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  /**
   * Delete a product
   * @param id - Product ID from URL parameter
   * @returns Confirmation of deletion
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
