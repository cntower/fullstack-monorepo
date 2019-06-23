import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request) {
      if (request.headers && request.headers.authorization) {
        request.user = await this.validateToken(request.headers.authorization);
        return true;
      }
    } else {
      const ctx: any = GqlExecutionContext.create(context).getContext();
      if (ctx.headers && ctx.headers.authorization) {
        ctx.user = await this.validateToken(ctx.headers.authorization);
        return true;
      }
    }
    return false;
  }

  async validateToken(token: string) {
    const tokenSplit = token.split(' ');
    if (tokenSplit[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
    try {
      const decoded = await jwt.verify(tokenSplit[1], process.env.SECRET);
      return decoded;
    } catch (error) {
      const message = `Token error: ${error.message || error.name}`;
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}