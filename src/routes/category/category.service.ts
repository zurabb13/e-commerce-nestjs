import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../../Schema/category.schema';
import { Model } from 'mongoose';
import { CategoryDto } from '../../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  //get all category
  async getAll(): Promise<Category[]> {
    const category = await this.categoryModel.find().exec();
    return category;
  }
  //find category by id
  async getById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    return category;
  }
  //create category
  async create(category: CategoryDto): Promise<Category> {
    const createCategory = await this.categoryModel.create(category);
    return createCategory.save();
  }
  //update category
  async update(id: string, body: CategoryDto): Promise<Category> {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, body, {
        new: true,
      })
      .exec();
    return category;
  }
  //delete category
  async delete(id: string): Promise<Category> {
    const category = await this.categoryModel.findByIdAndDelete(id);
    return category;
  }
}
