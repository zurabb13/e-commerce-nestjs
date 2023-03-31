import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from '../../Schema/cart.schema';
import { Model } from 'mongoose';
import { ItemDto } from '../../dto/item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
  ) {}

  //create Cart
  async create(
    userId: string,
    itemDto: ItemDto,
    subTotal: number,
    totalPrice: number,
  ): Promise<Cart> {
    const newCart = await this.cartModel.create({
      userId,
      item: [{ ...itemDto, subTotal }],
      totalPrice,
    });
    return newCart;
  }

  //get cart
  async getCart(userId: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userId });
    return cart;
  }
  //calc cart
  async calcCart(cart: CartDocument) {
    cart.totalPrice = 0;
    cart.item.forEach((item) => {
      cart.totalPrice += item.quantity * item.price;
    });
  }
  //delete cart
  async deleteCart(userId: string): Promise<Cart> {
    const deleteCart = await this.cartModel.findOneAndDelete({ userId });
    return deleteCart;
  }

  //add item
  async addItemCart(userId: string, itemDto: ItemDto): Promise<any> {
    const { productId, quantity, price } = itemDto;
    const subTotalPrice = quantity * price;

    const cart = await this.getCart(userId);
    if (cart) {
      const itemIndex = cart.item.findIndex(
        (item) => item.productId == productId,
      );

      if (itemIndex > -1) {
        let item = cart.item[itemIndex];
        item.quantity = Number(item.quantity) + Number(quantity);
        item.subTotalPrice = item.quantity * item.price;

        cart.item[itemIndex] = item;
        this.calcCart(cart);
        // @ts-ignore
        return cart.save();
      } else {
        cart.item.push({ ...itemDto, subTotalPrice });
        this.calcCart(cart);
        // @ts-ignore
        return cart.save();
      }
    } else {
      const newCart = await this.create(userId, itemDto, subTotalPrice, price);
      return newCart;
    }
  }
  async removeCart(userId: string, productId: string): Promise<any> {
    const cart = await this.getCart(userId);
    const itemIndex = cart.item.findIndex(
      (item) => item.productId == productId,
    );
    if (itemIndex > -1) {
      cart.item.splice(itemIndex, 1);
      // @ts-ignore
      return cart.save();
    }
  }
}
