import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'random_token', // Fontos: Ugyanaz legyen, mint az AuthModule-ban!
    });
  }

    async validate(payload: any) {
    // A trükk: 'userId' helyett 'id'-t használunk! 
    // Így a TypeORM azt hiszi, hogy ez egy valódi User entitás.
    return { id: payload.sub, email: payload.email };
  }
}