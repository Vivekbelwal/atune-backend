import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          // TODO: Use env variable
          secret: 'secret',
        });
        context['user'] = payload;
      } catch {
        throw new UnauthorizedException('Invalid token');
      }
      return true;
    } catch (err) {
      Logger.error('Error while authenticating', err);
      throw new UnauthorizedException('Error while authenticating', err);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
