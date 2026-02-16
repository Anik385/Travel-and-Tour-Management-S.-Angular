import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent implements OnInit {
  searchParams: any = {};
  flights: any[] = [];
  isLoading: boolean = true;
  airports: any[] = [];
  isAdmin: boolean = false;

  selectedAirlines: string[] = [];
  priceRange: number = 500;
  selectedStops: string = 'any';

  airlines: string[] = [
    'Qatar Airways',
    'Emirates',
    'Singapore Airlines',
    'Turkish Airlines',
    'British Airways',
    'Lufthansa',
    'Air France',
    'ANA All Nippon Airways',
    'Japan Airlines',
    'Korean Air',
    'Qantas',
    'Air Canada',
    'Virgin Atlantic',
    'Etihad Airways',
    'Cathay Pacific',
    'Biman Bangladesh Airlines',
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService
  ) {}

  ngOnInit() {
    this.loadAirports();
    this.route.queryParams.subscribe((params) => {
      this.searchParams = params;
      if (this.searchParams.from && this.searchParams.to) {
        this.searchFlights();
      } else {
        this.loadDefaultFlights();
      }
    });
  }

loadAirports() {
  this.flightService.getAirports().subscribe({ // ✅ Correct method
    next: (airports) => {
      this.airports = airports;
    },
    error: (error) => {
      console.error('Error loading airports:', error);
      this.airports = []; // Empty on error
    }
  });
}

  showFlightDetails(flight: any) {
    console.log('Flight details:', flight);
    // Optional: Navigate to flight details page
  }

  // loadDefaultFlights() {
  //   this.isLoading = true;
  //   this.flightService.getDefaultFlights().subscribe({
  //     next: (flights) => {
  //       this.flights = flights;
  //       this.isLoading = false;
  //     },
  //     error: (error) => {
  //       console.error('Error loading flights:', error);
  //       this.isLoading = false;
  //     }
  //   });
  // }
  loadDefaultFlights() {
    this.isLoading = true;

    this.flightService.getAllFlights().subscribe({
      next: (flights) => {
        console.log('Component received flights:', flights);
        console.log('First flight:', flights[0]);

        // Check if flights have required properties
        if (flights.length > 0) {
          console.log('Flight structure:', JSON.stringify(flights[0], null, 2));
        }

        this.flights = flights;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
      },
    });
  }
  loadSampleFlights() {
    this.flightService.getDefaultFlights().subscribe({
      next: (sampleFlights) => {
        this.flights = sampleFlights;
        console.log('Loaded sample flights:', sampleFlights.length);
      },
      error: (err) => {
        console.error('Error loading sample flights:', err);
        // Create basic sample flights
        this.flights = [
          {
            id: '1',
            airline: 'Sample Airlines',
            flightNumber: 'SA 101',
            departure: { airport: 'DAC', time: '08:00', date: '2024-03-20' },
            arrival: { airport: 'CXB', time: '09:30', date: '2024-03-20' },
            duration: '1h 30m',
            stops: 0,
            price: { economy: 120 },
            seatsAvailable: 150,
            aircraft: 'Boeing 737',
          },
        ];
      },
    });
  }

  searchFlights() {
    this.isLoading = true;
    this.flightService
      .searchFlights(
        this.searchParams.from,
        this.searchParams.to,
        this.searchParams.departure
      )
      .subscribe({
        next: (flights) => {
          if (flights.length === 0) {
            this.createAutoFlight();
          } else {
            this.flights = flights;
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
        },
      });
  }

  createAutoFlight() {
    const cityToAirport: any = {
      dhaka: 'DAC',
      chittagong: 'CGP',
      sylhet: 'ZYL',
      bangladesh: 'DAC',
      china: 'PEK',
      beijing: 'PEK',
      dubai: 'DXB',
      london: 'LHR',
      'new york': 'JFK',
      paris: 'CDG',
      tokyo: 'HND',
      singapore: 'SIN',
    };

    const fromCity = this.searchParams.from.toLowerCase();
    const toCity = this.searchParams.to.toLowerCase();

    const fromAirport =
      cityToAirport[fromCity] || fromCity.toUpperCase().substring(0, 3);
    const toAirport =
      cityToAirport[toCity] || toCity.toUpperCase().substring(0, 3);

    const airlines = [
      'Biman Bangladesh',
      'US-Bangla Airlines',
      'Novo Air',
      'Air Astra',
    ];
    const randomAirline = airlines[Math.floor(Math.random() * airlines.length)];

    const autoFlight = {
      id: 'AUTO' + Date.now(),
      airline: randomAirline,
      flightNumber:
        randomAirline.substring(0, 2).toUpperCase() +
        ' ' +
        Math.floor(100 + Math.random() * 900),
      departure: {
        airport: fromAirport,
        time: '08:00',
        date: this.searchParams.departure || '2024-03-20',
      },
      arrival: {
        airport: toAirport,
        time: '12:00',
        date: this.searchParams.departure || '2024-03-20',
      },
      duration: '4h 00m',
      stops: 0,
      price: {
        economy: Math.floor(300 + Math.random() * 700),
      },
      seatsAvailable: Math.floor(5 + Math.random() * 20),
      aircraft: 'Boeing 737',
    };

    this.flightService.createFlight(autoFlight).subscribe({
      next: (flight) => {
        // FIX: Add to existing flights instead of replacing
        this.flights = [...this.flights, flight];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error creating auto flight:', error);
        this.isLoading = false;
      },
    });
  }

  toggleAirline(airline: string) {
    const index = this.selectedAirlines.indexOf(airline);
    if (index > -1) {
      this.selectedAirlines.splice(index, 1);
    } else {
      this.selectedAirlines.push(airline);
    }
    this.applyFilters();
  }

  applyFilters() {
    let filteredFlights = [...this.flights];

    if (this.selectedAirlines.length > 0) {
      filteredFlights = filteredFlights.filter((flight) =>
        this.selectedAirlines.includes(flight.airline)
      );
    }

    filteredFlights = filteredFlights.filter(
      (flight) => (flight.price?.economy || flight.price) <= this.priceRange
    );

    if (this.selectedStops === 'nonstop') {
      filteredFlights = filteredFlights.filter((flight) => flight.stops === 0);
    } else if (this.selectedStops === '1stop') {
      filteredFlights = filteredFlights.filter((flight) => flight.stops === 1);
    }

    this.flights = filteredFlights;
  }

  sortFlights(criteria: string) {
    this.flights.sort((a, b) => {
      switch (criteria) {
        case 'price':
          return (a.price?.economy || a.price) - (b.price?.economy || b.price);
        case 'duration':
          return (
            this.parseDuration(a.duration) - this.parseDuration(b.duration)
          );
        case 'departure':
          return a.departure.time.localeCompare(b.departure.time);
        default:
          return 0;
      }
    });
  }

  private parseDuration(duration: string): number {
    const hours = parseInt(duration.match(/(\d+)h/)?.[1] || '0');
    const minutes = parseInt(duration.match(/(\d+)m/)?.[1] || '0');
    return hours * 60 + minutes;
  }

  //   bookFlight(flight: any) {
  //   console.log('Booking flight:', flight);

  //   // Store data in flight service
  //   this.flightService.setBookingData(flight, this.searchParams);

  //   // Navigate
  //   this.router.navigate(['/flights/booking']);
  //       state: { flight: flight }
  // }
  bookFlight(flight: any) {
    console.log('Booking flight:', flight);

    // Store data in flight service
    this.flightService.setBookingData(flight, this.searchParams);

    // Navigate with state
    this.router.navigate(['/flights/booking'], {
      state: { flight: flight },
    });
  } // <--- Only one brace here

  modifySearch() {
    this.router.navigate(['/'], {
      queryParams: this.searchParams,
    });
  }
}
