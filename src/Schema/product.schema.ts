import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from './category.schema';

export type ProductDocument = Product & Document;
@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
