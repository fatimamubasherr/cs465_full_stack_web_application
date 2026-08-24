import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAuthApi = request.url.endsWith('/login') || request.url.endsWith('/register');

    if (this.authenticationService.isLoggedIn() && !isAuthApi) {
      const token = this.authenticationService.getToken();
      const authenticatedRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(authenticatedRequest);
    }

    return next.handle(request);
  }
}
