
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Search Variables
  searchTerm: string = '';
  activeTab: string = 'tours';

  // Flight Search Variables
  flightFrom: string = '';
  flightTo: string = '';
  flightDeparture: string = '';
  flightReturn: string = '';
  flightTravelers: string = '1 Adult';
  flightClass: string = 'Economy';

  // Featured Destinations Data
  featuredDestinations = [
    {
      id: 4,
      name: 'Dubai, UAE',
      image: 'assets/images/destinations/dubai.jpg',
      tours: 12
    },
    {
      id: 1, 
      name: 'Bali, Indonesia',
      image: 'assets/images/destinations/bali.jpg',
      tours: 8
    },
    {
      id: 3,
      name: 'Paris, France',
      image: 'assets/images/destinations/paris.jpg', 
      tours: 10
    },
    {
      id: 5,
      name: 'Makkah, Saudi Arabia',
      image: 'assets/images/destinations/makkah.jpg',
      tours: 15
    },
    {
      id: 9,
      name: 'London, UK',
      image: 'assets/images/destinations/london.jpg',
      tours: 9
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      image: 'assets/images/destinations/tokyo.jpg',
      tours: 7
    }
  ];

  constructor(private router: Router) {}

  // Tab Methods
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Tours Search Method
  onSearch() {
    if (this.searchTerm.toLowerCase().includes('dubai')) {
      this.router.navigate(['/tours', 4]);
    } else if (this.searchTerm.toLowerCase().includes('london')) {
      this.router.navigate(['/tours', 9]);
    } else if (this.searchTerm.toLowerCase().includes('bali')) {
      this.router.navigate(['/tours', 1]);
    } else if (this.searchTerm.toLowerCase().includes('paris')) {
      this.router.navigate(['/tours', 3]);
    } else if (this.searchTerm.toLowerCase().includes('makkah')) {
      this.router.navigate(['/tours', 5]);
    } else if (this.searchTerm.toLowerCase().includes('tokyo')) {
      this.router.navigate(['/tours', 2]);
    } else {
      this.router.navigate(['/tours'], { 
        queryParams: { search: this.searchTerm } 
      });
    }
  }

  // Flight Search Method - Navigate to Flight Results
  onFlightSearch() {
    // Validate flight search
    if (!this.flightFrom || !this.flightTo || !this.flightDeparture) {
      alert('Please fill in From, To, and Departure date');
      return;
    }
    // Convert city names to airport codes
  // const airportCodes: any = {
  //   'dubai': 'DXB', 'london': 'LHR', 'bali': 'DPS', 'tokyo': 'HND',
  //   'doha': 'DOH', 'dhaka': 'DAC', 'bangladesh': 'DAC',
  //   'china': 'PEK', 'beijing': 'PEK', 'guangzhou': 'CAN'
  // };

  // const fromCode = airportCodes[this.flightFrom.toLowerCase()] || this.flightFrom;
  // const toCode = airportCodes[this.flightTo.toLowerCase()] || this.flightTo;

    // Navigate to flight search results page with search parameters
    this.router.navigate(['/flights/search'], {
      queryParams: {
        from: this.flightFrom,
        to: this.flightTo,
        departure: this.flightDeparture,
        return: this.flightReturn,
        travelers: this.flightTravelers,
        class: this.flightClass
      }
    });
  }

  // Quick destination search methods
  searchFlightsTo(destination: string) {
    this.activeTab = 'flights';
    this.flightTo = destination;
    this.flightFrom = 'Dhaka';
  }

  // Navigation for featured destinations
  // navigateToDestination(destination: any) {
  //   this.router.navigate(['/tours', destination.id]);
  // }

navigateToDestination(destination: any) {
  // Navigate to specific tour by tourId
  if (destination.tourId) {
    this.router.navigate(['/tour-details', destination.tourId]);
  } else {
    // Fallback: search by name
    this.router.navigate(['/tour-details'], { 
      queryParams: { search: destination.name } 
    });
  }
}

  // Helper method for date input
  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}