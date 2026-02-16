import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-tours',
  templateUrl: './admin-tours.component.html',
  styleUrls: ['./admin-tours.component.scss']
})
export class AdminToursComponent implements OnInit {
  searchTerm: string = '';
  statusFilter: string = '';
  destinationFilter: string = '';
  tours: any[] = [];
  isLoading = true;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadTours();
  }

  loadTours() {
    const token = this.authService.getToken();
    
    this.http.get('http://localhost:8080/api/tours', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (response: any) => {
        this.tours = response.map((tour: any) => ({
          id: tour.id,
          title: tour.title,
          description: tour.description || 'No description',
          destination: tour.destination,
          price: tour.price,
          duration: tour.duration,
          status: tour.isActive ? 'active' : 'inactive',
          image: tour.images && tour.images.length > 0 ? tour.images[0] : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828'
        }));
        this.isLoading = false;
        console.log('Loaded tours:', this.tours.length);
      },
      error: (error) => {
        console.error('Error loading tours:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredTours() {
    return this.tours.filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           tour.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || tour.status === this.statusFilter;
      const matchesDestination = !this.destinationFilter || tour.destination.toLowerCase().includes(this.destinationFilter.toLowerCase());
      
      return matchesSearch && matchesStatus && matchesDestination;
    });
  }

  deleteTour(id: number) {
    if (confirm('Are you sure you want to delete this tour?')) {
      const token = this.authService.getToken();
      
      this.http.delete(`http://localhost:8080/api/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: () => {
          this.tours = this.tours.filter(tour => tour.id !== id);
          alert('Tour deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting tour:', error);
          alert('Failed to delete tour');
        }
      });
    }
  }

  toggleTourStatus(id: number) {
    const tour = this.tours.find(t => t.id === id);
    if (tour) {
      const newStatus = !tour.isActive;
      const token = this.authService.getToken();
      
      this.http.put(`http://localhost:8080/api/tours/${id}`, {
        isActive: newStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: () => {
          tour.status = newStatus ? 'active' : 'inactive';
          tour.isActive = newStatus;
        },
        error: (error) => {
          console.error('Error updating tour:', error);
        }
      });
    }
  }
}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-tours',
//   templateUrl: './admin-tours.component.html',
//   styleUrls: ['./admin-tours.component.scss']
// })
// export class AdminToursComponent {
//   searchTerm: string = '';
//   statusFilter: string = '';
//   destinationFilter: string = '';

//   tours = [
//     {
//       id: 1,
//       title: 'Bali Paradise Tour',
//       description: 'Experience the perfect blend of culture and relaxation',
//       destination: 'Bali',
//       price: 899,
//       duration: 7,
//       status: 'active',
//       image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2'
//     },
//     {
//       id: 2,
//       title: 'Tokyo City Break',
//       description: 'Discover the vibrant culture of Tokyo',
//       destination: 'Tokyo',
//       price: 1200,
//       duration: 5,
//       status: 'active',
//       image: 'https://images.unsplash.com/photo-1540959733332-8ab4c6d0a893'
//     },
//     {
//       id: 3,
//       title: 'Paris Romantic Getaway',
//       description: 'Romantic tour through the city of love',
//       destination: 'Paris',
//       price: 1500,
//       duration: 5,
//       status: 'inactive',
//       image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52'
//     }
//   ];

//   get filteredTours() {
//     return this.tours.filter(tour => {
//       const matchesSearch = tour.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//                            tour.description.toLowerCase().includes(this.searchTerm.toLowerCase());
//       const matchesStatus = !this.statusFilter || tour.status === this.statusFilter;
//       const matchesDestination = !this.destinationFilter || tour.destination.toLowerCase() === this.destinationFilter.toLowerCase();
      
//       return matchesSearch && matchesStatus && matchesDestination;
//     });
//   }

//   deleteTour(id: number) {
//     if (confirm('Are you sure you want to delete this tour?')) {
//       this.tours = this.tours.filter(tour => tour.id !== id);
//     }
//   }

//   toggleTourStatus(id: number) {
//     const tour = this.tours.find(t => t.id === id);
//     if (tour) {
//       tour.status = tour.status === 'active' ? 'inactive' : 'active';
//     }
//   }
// }