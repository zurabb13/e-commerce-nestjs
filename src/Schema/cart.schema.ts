import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Item } from './item.schema';

export type CartDocument = Cart & Document;
@Schema()
export class Cart {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Users' })
  userId: string;

  @Prop()
  item: Item[];

  @Prop()
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
