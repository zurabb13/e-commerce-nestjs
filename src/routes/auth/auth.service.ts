import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.find(username);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (user && passwordMatch) {
      return user;
    }
    return null;
  }
}
