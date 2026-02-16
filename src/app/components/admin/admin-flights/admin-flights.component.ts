import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.scss']
})
export class AdminFlightsComponent implements OnInit {
  searchTerm: string = '';
  airlineFilter: string = '';
  flights: any[] = [];
  
  airlines: string[] = [
    'Emirates', 'Qatar Airways', 'Singapore Airlines', 'Turkish Airlines',
    'British Airways', 'Lufthansa', 'Air France', 'Biman Bangladesh'
  ];

  constructor(private flightService: FlightService) {}

  ngOnInit() {
    this.loadFlights();
  }

  loadFlights() {
    this.flightService.getAllFlights().subscribe({
      next: (flights) => {
        this.flights = flights;
      },
      error: (error) => {
        console.error('Error loading flights:', error);
      }
    });
  }

  get filteredFlights() {
    return this.flights.filter(flight => {
      const matchesSearch = !this.searchTerm || 
        flight.airline.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        flight.flightNumber.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesAirline = !this.airlineFilter || 
        flight.airline === this.airlineFilter;
      
      return matchesSearch && matchesAirline;
    });
  }

  deleteFlight(flightId: string) {
    if (confirm('Are you sure you want to delete this flight?')) {
      this.flightService.deleteFlight(flightId).subscribe({
        next: () => {
          this.flights = this.flights.filter(f => f.id !== flightId);
        },
        error: (error) => console.error('Error deleting flight:', error)
      });
    }
  }
}