import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../../Schema/product.schema';
import { ProductDto } from '../../dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private service: ProductService) {}

  //get all product
  @Get()
  async product(): Promise<Product[]> {
    return this.service.products();
  }
  //get product by id
  @Get('/:id')
  async productById(@Param('id') id: string): Promise<Product> {
    const product = await this.service.product(id);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  @Post()
  async create(@Body() product: ProductDto) {
    const products = await this.service.create(product);
    return products;
  }
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() product: ProductDto) {
    const products = await this.service.update(id, product);
    if (!products) {
      throw new NotFoundException('product not created');
    }
    return products;
  }
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const product = await this.service.delete(id);
    return product;
  }
}
