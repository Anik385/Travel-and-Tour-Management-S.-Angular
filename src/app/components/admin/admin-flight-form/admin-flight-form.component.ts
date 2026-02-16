import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-admin-flight-form',
  templateUrl: './admin-flight-form.component.html',
  styleUrls: ['./admin-flight-form.component.scss']
})
export class AdminFlightFormComponent implements OnInit {
  isEditMode: boolean = false;
  flightId: string = '';
  
  flight: any = {
    airline: '',
    flightNumber: '',
    aircraft: 'Boeing 737',
    departure: {
      airport: '',
      date: '',
      time: '08:00'
    },
    arrival: {
      airport: '',
      date: '',
      time: '12:00'
    },
    duration: '4h 00m',
    stops: 0,
    price: {
      economy: 0
    },
    seatsAvailable: 150
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.flightId = params['id'];
        this.loadFlightData(this.flightId);
      }
    });
  }

  loadFlightData(id: string) {
    this.flightService.getFlightById(id).subscribe({
      next: (flight) => {
        this.flight = flight;
      },
      error: (error) => {
        console.error('Error loading flight:', error);
      }
    });
  }

  saveFlight() {
    if (this.isEditMode) {
      this.flightService.updateFlight(this.flightId, this.flight).subscribe({
        next: () => {
          alert('Flight updated successfully!');
          this.router.navigate(['/admin/flights']);
        },
        error: (error) => {
          console.error('Error updating flight:', error);
          alert('Error updating flight');
        }
      });
    } else {
      this.flightService.createFlight(this.flight).subscribe({
        next: () => {
          alert('Flight created successfully!');
          this.router.navigate(['/admin/flights']);
        },
        error: (error) => {
          console.error('Error creating flight:', error);
          alert('Error creating flight');
        }
      });
    }
  }
}