import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from '../../strategy/local.strategy';
import { JwtStrategy } from '../../strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.SECRET}`,
      signOptions: { expiresIn: '30d' },
    }),
    PassportModule,
    UserModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
