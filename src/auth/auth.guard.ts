import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { EnvUtil } from '~/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const gqlContext = GqlExecutionContext.create(context);
      const graphqlContext = gqlContext.getContext();
      const request = graphqlContext.req;

      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: EnvUtil.getEnv('JWT_SECRET'),
        });
        graphqlContext.user = payload.user;
      } catch (error) {
        Logger.error('JWT verification failed', error);
        throw new UnauthorizedException('Invalid token');
      }

      return true;
    } catch (err) {
      Logger.error('Error while authenticating', err);
      throw new UnauthorizedException('Authentication failed');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authorization = request.headers?.authorization;
    if (!authorization) {
      return undefined;
    }
    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
