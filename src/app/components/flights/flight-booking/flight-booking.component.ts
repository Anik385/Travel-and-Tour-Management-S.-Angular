import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.scss']
})
export class FlightBookingComponent implements OnInit {
  flight: any = null;
  searchParams: any = {};
  flightService: any;

  constructor(private router: Router) {}

  ngOnInit() {
  // Get data from flight service
  // const bookingData = this.flightService.getBookingData();
  // this.flight = bookingData.flight;
  // this.searchParams = bookingData.searchParams;
    this.flight = history.state.flight; // Get from navigation state
  if (!this.flight) {
    this.router.navigate(['/flights']);
  }
}

  getTaxes(): number {
    const basePrice = this.flight?.price?.economy || 0;
    return Math.round(basePrice * 0.15); // 15% taxes
  }

  getTotalPrice(): number {
    const basePrice = this.flight?.price?.economy || 0;
    return basePrice + this.getTaxes();
  }

  continueToPassenger() {
    this.router.navigate(['/flights/passenger-details'], {
      state: {
        flight: this.flight,
        searchParams: this.searchParams,
        totalPrice: this.getTotalPrice()
      }
    });
  }

  goBack() {
    this.router.navigate(['/flights'], {
      queryParams: this.searchParams
    });
  }
}