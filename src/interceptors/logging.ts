import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const url = request.url;

    console.log(`Request URL: ${url}`);

    return next.handle().pipe(
      tap((data) => {
        // This 'data' is the response data before it's sent to the client
        console.log('Response data:', data);
      }),
    );
  }
}
