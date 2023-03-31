import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserDto } from '../../dto/user.dto';
import { LocalAuthGuard } from '../../guard/local.auth.guard';
import { RolesGuard } from '../../guard/roles.guard';
import { Roles } from './role.decorator';
import { Role } from '../../enum/role.enum';
import { JwtAuthGuard } from '../../guard/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() creatUser: UserDto) {
    const user = await this.userService.create(creatUser);
    return user;
  }

  @UseGuards(LocalAuthGuard, RolesGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('user')
  getUser(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('admin')
  getAdmin(@Request() req) {
    return req.user;
  }
}
