import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

import { ConfigService } from '@nestjs/config';
import { User } from 'entities/users';
import { AccessToken } from 'entities/access_tokens';

import { JwtDto } from 'features/auth/dtos/jwt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AUTH_STRATEGY } from 'src/constants';

@Injectable()
export default class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  AUTH_STRATEGY.REFRESH_TOKEN,
) {
  constructor(
    readonly configService: ConfigService,
        @InjectRepository(User) private usersRepo: Repository<User>,
        @InjectRepository(AccessToken)
    private accessTokenRepo: Repository<AccessToken>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.refreshSecret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtDto) {
    const token = req.get('Authorization').replace('Bearer', '').trim();
    if (
      !(await this.accessTokenRepo.findOneBy({
        refresh_token: token
      }))
    ){
      throw new UnauthorizedException();
    }

    switch(payload.resourceOwner) {
              case "users":
          return this.validateUser(payload.userId)
            default:
        throw new BadRequestException(`scope ${payload.scope} is not supported.`);
    }
  }

    async validateUser(userId: number) {
    const user = await this.usersRepo.findOneBy({ id: userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
  
}
