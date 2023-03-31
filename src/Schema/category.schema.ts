import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = Category & Document;
@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  icon: string;

  @Prop()
  color: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
