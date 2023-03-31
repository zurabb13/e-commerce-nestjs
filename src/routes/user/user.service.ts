import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../Schema/user.schema';
import { Model } from 'mongoose';
import { UserDto } from '../../dto/user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  //create user
  async create(createUser: UserDto): Promise<User> {
    const user = await this.userModel.create(createUser);
    user.password = await bcrypt.hash(user.password, 10);
    return user.save();
  }

  //find user
  async find(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
