import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html'
})
export class TripCardComponent {
  @Input({ required: true }) trip!: Trip;
  @Output() deleted = new EventEmitter<void>();
  deleting = false;

  constructor(
    private router: Router,
    private tripService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  editTrip(): void {
    this.router.navigate(['/edit-trip', this.trip.code]);
  }

  deleteTrip(): void {
    if (!this.isLoggedIn()) return;
    if (!confirm(`Delete ${this.trip.name}?`)) return;
    this.deleting = true;
    this.tripService.deleteTrip(this.trip.code).subscribe({
      next: () => this.deleted.emit(),
      error: (e) => {
        console.error(e);
        alert('Unable to delete trip.');
        this.deleting = false;
      }
    });
  }
}
