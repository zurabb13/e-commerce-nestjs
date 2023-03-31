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
import { CategoryService } from './category.service';
import { Category } from '../../Schema/category.schema';
import { CategoryDto } from '../../dto/category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) {}

  //get all category
  @Get()
  async getAll(): Promise<Category[]> {
    return await this.service.getAll();
  }

  //get category by id
  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Category> {
    const category = await this.service.getById(id);
    if (category) {
      throw new NotFoundException('this category not found');
    }
    return category;
  }
  //create new category
  @Post()
  async create(@Body() categoryDto: CategoryDto) {
    const category = await this.service.create(categoryDto);
    if (!category) {
      throw new NotFoundException('category not created');
    }
    return category;
  }
  //update category
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: CategoryDto,
  ): Promise<Category> {
    const category = await this.service.update(id, body);
    if (!category) {
      throw new NotFoundException('category not updated');
    }
    return category;
  }
  //delete category
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Category> {
    const category = await this.service.delete(id);
    return category;
  }
}
