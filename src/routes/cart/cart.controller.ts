import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../../guard/jwt.auth.guard';
import { RolesGuard } from '../../guard/roles.guard';
import { Role } from '../../enum/role.enum';
import { Roles } from '../auth/role.decorator';
import { ItemDto } from '../../dto/item.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post()
  async addItem(@Request() req, @Body() itemDto: ItemDto) {
    const userId = req.user.userId;
    const cart = await this.cartService.addItemCart(userId, itemDto);
    return cart;
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Delete()
  async remove(@Request() req, @Body() { productId }) {
    const userId = req.user.userId;
    const cart = await this.cartService.removeCart(userId, productId);
    if (!cart) {
      throw new NotFoundException('item does not exist');
    }
    return cart;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const cart = await this.cartService.deleteCart(id);
    if (!cart) {
      throw new NotFoundException('cart does not exist');
    }
    return cart;
  }
}
