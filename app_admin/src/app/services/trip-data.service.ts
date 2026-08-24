import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  private readonly baseUrl = 'http://localhost:3000/api';
  private readonly tripsUrl = `${this.baseUrl}/trips`;

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.tripsUrl}/${encodeURIComponent(tripCode)}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, trip);
  }

  updateTrip(originalCode: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.tripsUrl}/${encodeURIComponent(originalCode)}`, trip);
  }

  deleteTrip(tripCode: string): Observable<{ message: string; trip: Trip }> {
    return this.http.delete<{ message: string; trip: Trip }>(`${this.tripsUrl}/${encodeURIComponent(tripCode)}`);
  }

  login(user: User, password: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, password);
  }

  register(user: User, password: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, password);
  }

  private handleAuthAPICall(endpoint: 'login' | 'register', user: User, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, {
      name: user.name,
      email: user.email,
      password
    });
  }
}
