import { Inject, Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { TripDataService } from './trip-data.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly tokenKey = 'travlr-token';

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  public getToken(): string {
    return this.storage.getItem(this.tokenKey) || '';
  }

  public saveToken(token: string): void {
    this.storage.setItem(this.tokenKey, token);
  }

  public logout(): void {
    this.storage.removeItem(this.tokenKey);
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      this.logout();
      return false;
    }
  }

  public getCurrentUser(): User | null {
    if (!this.isLoggedIn()) return null;
    try {
      const { email, name } = JSON.parse(atob(this.getToken().split('.')[1]));
      return { email, name } as User;
    } catch {
      return null;
    }
  }

  public login(user: User, password: string): Observable<void> {
    return this.tripDataService.login(user, password).pipe(
      tap((response) => this.saveToken(response.token)),
      map(() => undefined)
    );
  }

  public register(user: User, password: string): Observable<void> {
    return this.tripDataService.register(user, password).pipe(
      tap((response) => this.saveToken(response.token)),
      map(() => undefined)
    );
  }
}
