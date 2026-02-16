import { Component, OnInit } from '@angular/core';
import { TourService, Tour } from '../../../services/tour.service';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent implements OnInit {
  tours: Tour[] = [];
  filteredTours: Tour[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  // Search filters
  searchTerm: string = '';
  destinationFilter: string = '';
  durationFilter: string = '';

  constructor(private tourService: TourService) {}

  ngOnInit() {
    this.loadTours();
  }

  loadTours() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.tourService.getAllTours().subscribe({
      next: (data) => {
        this.tours = data;
        this.filteredTours = data; // Initial display
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tours:', error);
        this.errorMessage = 'Failed to load tours. Please try again.';
        this.isLoading = false;
      }
    });
  }

  // Apply search filters
  applyFilters() {
    this.filteredTours = this.tours.filter(tour => {
      const matchesSearch = !this.searchTerm || 
        tour.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        tour.destination.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesDestination = !this.destinationFilter || 
        tour.destination.toLowerCase().includes(this.destinationFilter.toLowerCase());
      
      const matchesDuration = this.applyDurationFilter(tour.duration);
      
      return matchesSearch && matchesDestination && matchesDuration;
    });
  }

  private applyDurationFilter(duration: number): boolean {
    switch(this.durationFilter) {
      case '1-3': return duration >= 1 && duration <= 3;
      case '4-7': return duration >= 4 && duration <= 7;
      case '8+': return duration >= 8;
      default: return true;
    }
  }

  clearFilters() {
    this.searchTerm = '';
    this.destinationFilter = '';
    this.durationFilter = '';
    this.filteredTours = this.tours;
  }
}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-tour-list',
//   templateUrl: './tour-list.component.html',
//   styleUrls: ['./tour-list.component.scss'],
// })
// export class TourListComponent {
//   searchTerm: string = '';
//   destinationFilter: string = '';
//   durationFilter: string = '';

//   // Expanded tours data with 15+ countries
//   tours: any[] = [
//     {
//       id: 1,
//       title: 'Bali Paradise Tour',
//       destination: 'Bali, Indonesia',
//       duration: 7,
//       price: 899,
//       originalPrice: 1099,
//       discount: 18,
//       image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
//       rating: 4.8,
//       reviews: 124
//     },
//     {
//       id: 2,
//       title: 'Tokyo City Break',
//       destination: 'Tokyo, Japan',
//       duration: 5,
//       price: 1200,
//       image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dG9reW98ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
//       rating: 4.6,
//       reviews: 89
//     },
//     {
//       id: 3,
//       title: 'Paris Romantic Getaway',
//       destination: 'Paris, France',
//       duration: 5,
//       price: 1500,
//       image: 'https://marleneonthemove.com/wp-content/uploads/2016/05/chris-karidis-nnzkZNYWHaU-unsplash.jpg',
//       rating: 4.9,
//       reviews: 156
//     },
//     {
//       id: 4,
//       title: 'Dubai Luxury Experience',
//       destination: 'Dubai, UAE',
//       duration: 6,
//       price: 2200,
//       originalPrice: 2800,
//       discount: 21,
//       image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
//       rating: 4.7,
//       reviews: 203
//     },
//     {
//       id: 5,
//       title: 'Makkah Spiritual Journey',
//       destination: 'Makkah, Saudi Arabia',
//       duration: 8,
//       price: 1800,
//       image: 'https://plus.unsplash.com/premium_photo-1697730274057-19338e84db8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FhYmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500',
//       rating: 4.9,
//       reviews: 312
//     },
//     {
//       id: 6,
//       title: 'Riyadh City Explorer',
//       destination: 'Riyadh, Saudi Arabia',
//       duration: 4,
//       price: 1100,
//       image: 'https://plus.unsplash.com/premium_photo-1694475183306-4efa6a24f59c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.5,
//       reviews: 67
//     },
//     {
//       id: 7,
//       title: 'Bangkok Cultural Tour',
//       destination: 'Bangkok, Thailand',
//       duration: 6,
//       price: 950,
//       image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
//       rating: 4.4,
//       reviews: 98
//     },
//     {
//       id: 8,
//       title: 'Singapore City Adventure',
//       destination: 'Singapore',
//       duration: 5,
//       price: 1300,
//       image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
//       rating: 4.7,
//       reviews: 145
//     },
//     {
//       id: 9,
//       title: 'London Royal Tour',
//       destination: 'London, UK',
//       duration: 7,
//       price: 1700,
//       image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
//       rating: 4.6,
//       reviews: 178
//     },
//     {
//       id: 10,
//       title: 'New York City Dreams',
//       destination: 'New York, USA',
//       duration: 6,
//       price: 1900,
//       image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
//       rating: 4.8,
//       reviews: 234
//     },
//     {
//       id: 11,
//       title: 'Sydney Coastal Escape',
//       destination: 'Sydney, Australia',
//       duration: 8,
//       price: 2100,
//       image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
//       rating: 4.7,
//       reviews: 167
//     },
//     {
//       id: 12,
//       title: 'Istanbul Cultural Heritage',
//       destination: 'Istanbul, Turkey',
//       duration: 7,
//       price: 1250,
//       originalPrice: 1500,
//       discount: 17,
//       image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200',
//       rating: 4.8,
//       reviews: 189
//     },
//     {
//       id: 13,
//       title: 'Cape Town Natural Wonders',
//       destination: 'Cape Town, South Africa',
//       duration: 9,
//       price: 1650,
//       image: 'https://images.unsplash.com/photo-1484318571209-661cf29a69c3',
//       rating: 4.9,
//       reviews: 134
//     },
//     {
//       id: 14,
//       title: 'Rome Historical Journey',
//       destination: 'Rome, Italy',
//       duration: 6,
//       price: 1400,
//       image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
//       rating: 4.7,
//       reviews: 276
//     },
//     {
//       id: 15,
//       title: 'Jeddah Red Sea Retreat',
//       destination: 'Jeddah, Saudi Arabia',
//       duration: 5,
//       price: 1200,
//       image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
//       rating: 4.6,
//       reviews: 89
//     }
//   ];

//   // Filter logic
//   get filteredTours() {
//     return this.tours.filter(tour => {
//       const matchesSearch = this.searchTerm ? 
//         tour.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         tour.destination.toLowerCase().includes(this.searchTerm.toLowerCase())
//         : true;
      
//       const matchesDestination = !this.destinationFilter || 
//         tour.destination.toLowerCase().includes(this.destinationFilter.toLowerCase());
      
//       const matchesDuration = this.applyDurationFilter(tour.duration);
      
//       return matchesSearch && matchesDestination && matchesDuration;
//     });
//   }

//   private applyDurationFilter(duration: number): boolean {
//     switch(this.durationFilter) {
//       case '1-3': return duration >= 1 && duration <= 3;
//       case '4-7': return duration >= 4 && duration <= 7;
//       case '8+': return duration >= 8;
//       default: return true;
//     }
//   }

//   applyFilters() {
//     // The filteredTours getter automatically updates when filters change
//     console.log('Filters applied:', {
//       search: this.searchTerm,
//       destination: this.destinationFilter,
//       duration: this.durationFilter
//     });
//   }

//   clearFilters() {
//     this.searchTerm = '';
//     this.destinationFilter = '';
//     this.durationFilter = '';
//   }


  
// }