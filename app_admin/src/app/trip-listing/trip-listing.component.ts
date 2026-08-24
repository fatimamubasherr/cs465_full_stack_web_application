import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html'
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message = 'Loading trips...';
  error = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  loadTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value) => {
        this.trips = value;
        this.message = value.length
          ? `There are ${value.length} trips available.`
          : 'There are no trips available.';
      },
      error: (err) => {
        console.error(err);
        this.error = 'Unable to load trips from the API.';
        this.message = '';
      }
    });
  }

  addTrip(): void {
    if (this.isLoggedIn()) this.router.navigate(['/add-trip']);
  }

  onDeleted(): void {
    this.loadTrips();
  }
}
