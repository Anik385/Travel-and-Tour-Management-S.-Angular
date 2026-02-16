// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BookingService, Booking } from 'src/app/services/booking.service';
// import { TourService, Tour } from 'src/app/services/tour.service';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-booking',
//   templateUrl: './booking.component.html',
//   styleUrls: ['./booking.component.scss']
// })
// export class BookingComponent implements OnInit {

//   tourId: number = 0;
//   tour: Tour | null = null;

//   bookingData: Booking = {
//     userId: 0,        // ✅ will be set from token
//     tourId: 0,
//     travelDate: '',
//     numberOfGuests: 1,
//     totalAmount: 0,
//     status: 'CONFIRMED'
//   };

//   isLoading = true;
//   isSubmitting = false;
//   errorMessage = '';

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private tourService: TourService,
//     private bookingService: BookingService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.tourId = +params['tourId'];
//       this.bookingData.tourId = this.tourId;

//       // ✅ FIX: assign userId
//       const userId = this.extractUserIdFromToken();
//       if (userId) {
//         this.bookingData.userId = userId;
//       }

//       this.loadTourData();
//     });
//   }

//   // ✅ SAFE JWT DECODE (Base64URL)
//   private extractUserIdFromToken(): number | null {
//     const token = localStorage.getItem('token');
//     if (!token) return null;

//     try {
//       const payloadBase64 = token.split('.')[1]
//         .replace(/-/g, '+')
//         .replace(/_/g, '/');

//       const payload = JSON.parse(atob(payloadBase64));
//       return payload.userId;
//     } catch (error) {
//       console.error('Error decoding token', error);
//       return null;
//     }
//   }

//   loadTourData(): void {
//     this.tourService.getTourById(this.tourId).subscribe({
//       next: (tour) => {
//         this.tour = tour;
//         this.bookingData.totalAmount =
//           tour.price * this.bookingData.numberOfGuests;
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error loading tour:', error);
//         this.router.navigate(['/tours']);
//       }
//     });
//   }

//   updateTotalAmount(): void {
//     if (this.tour) {
//       this.bookingData.totalAmount =
//         this.tour.price * this.bookingData.numberOfGuests;
//     }
//   }

//   submitBooking(): void {
//     if (!this.isFormValid()) {
//       alert('Please fill all required fields');
//       return;
//     }

//     this.isSubmitting = true;

//     this.bookingService.createBooking(this.bookingData).subscribe({
//       next: (response: any) => {
//         console.log('Booking successful:', response);
//         this.router.navigate(
//           ['/booking-confirmation', response.bookingReference]
//         );
//       },
//       error: (error) => {
//         console.error('Booking error:', error);
//         this.errorMessage =
//           'Booking failed: ' +
//           (error.error?.message || error.statusText || 'Unknown error');
//         alert(this.errorMessage);
//         this.isSubmitting = false;
//       }
//     });
//   }

//   private isFormValid(): boolean {
//     return !!this.bookingData.travelDate &&
//            this.bookingData.numberOfGuests > 0 &&
//            this.bookingData.userId > 0;
//   }

//   getTodayDate(): string {
//     return new Date().toISOString().split('T')[0];
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService, Booking } from 'src/app/services/booking.service';
import { TourService, Tour } from 'src/app/services/tour.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  tourId: number = 0;
  tour: Tour | null = null;
  
  bookingData: Booking = {
    userId: 0,
    tourId: 0,
    travelDate: '',
    numberOfGuests: 1,
    totalAmount: 0,
    status: 'CONFIRMED'
  };

  isLoading: boolean = true;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourService: TourService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tourId = +params['tourId'];
      this.bookingData.tourId = this.tourId;
      this.loadTourData();
      this.extractUserIdFromToken();
    });
  }

  private extractUserIdFromToken() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      // Check if token is valid
      if (typeof token !== 'string' || !token.includes('.')) {
        console.error('Invalid token format:', token);
        return;
      }
      
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.bookingData.userId = payload.userId || payload.sub || 0;
      console.log('Extracted user ID:', this.bookingData.userId);
    } catch (error) {
      console.error('Error parsing token:', error);
      console.log('Token value:', token);
    }
  }
}

  // private extractUserIdFromToken() {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     try {
  //       const payload = JSON.parse(atob(token.split('.')[1]));
  //       this.bookingData.userId = payload.userId || 0;
  //     } catch (error) {
  //       console.error('Error parsing token:', error);
  //     }
  //   }
  // }
//     const payloadBase64 = token.split('.')[1]
//       .replace(/-/g, '+')
//       .replace(/_/g, '/');

//     const payload = JSON.parse(atob(payloadBase64));
//     return payload.userId;
//   } catch (error) {
//     console.error('Error decoding token', error);
//     return null;
//   }
// }


  loadTourData() {
    this.tourService.getTourById(this.tourId).subscribe({
      next: (tour) => {
        this.tour = tour;
        this.bookingData.totalAmount = tour.price * this.bookingData.numberOfGuests;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tour:', error);
        this.router.navigate(['/tours']);
      }
    });
  }

  updateTotalAmount() {
    if (this.tour) {
      this.bookingData.totalAmount = this.tour.price * this.bookingData.numberOfGuests;
    }
  }

  submitBooking() {
  // TEMPORARY: Skip API call and go directly to checkout
this.router.navigate(['/checkout', this.tourId], {
  state: {
    tour: this.tour,
    bookingData: this.bookingData
  }
});  
  /*
  // Original code (commented out):
  if (!this.isFormValid()) {
    alert('Please fill all required fields');
    return;
  }

  this.isSubmitting = true;
  
  this.bookingService.createBooking(this.bookingData).subscribe({
    next: (response: any) => {
      console.log('Booking successful:', response);
      this.router.navigate(['/booking-confirmation', response.bookingReference]);
    },
    error: (error) => {
      console.error('Booking error:', error);
      this.errorMessage = 'Booking failed: ' + 
        (error.error?.message || error.statusText || 'Unknown error');
      alert(this.errorMessage);
      this.isSubmitting = false;
    }
  });
  */
}

  // submitBooking() {
  //   if (!this.isFormValid()) {
  //     alert('Please fill all required fields');
  //     return;
  //   }

  //   this.isSubmitting = true;
    
  //   this.bookingService.createBooking(this.bookingData).subscribe({
  //     next: (response: any) => {
  //       console.log('Booking successful:', response);
  //       this.router.navigate(['/booking-confirmation', response.bookingReference]);
  //     },
  //     error: (error) => {
  //       console.error('Booking error:', error);
  //       this.errorMessage = 'Booking failed: ' + 
  //         (error.error?.message || error.statusText || 'Unknown error');
  //       alert(this.errorMessage);
  //       this.isSubmitting = false;
  //     }
  //   });
  // }

  private isFormValid(): boolean {
    return !!this.bookingData.travelDate && this.bookingData.numberOfGuests > 0;
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { TourService, Tour } from '../../../services/tour.service';
// import { BookingService, Booking } from '../../../services/booking.service';
// import { AuthService } from '../../../services/auth.service';

// @Component({
//   selector: 'app-booking',
//   templateUrl: './booking.component.html',
//   styleUrls: ['./booking.component.scss']
// })
// export class BookingComponent implements OnInit {
//   tourId: number = 0;
//   tour: Tour | null = null;
  
//   // Booking form data
//   bookingData = {
//     userId: 1, // Get from auth service
//     tourId: 0,
//     travelDate: '',
//     numberOfGuests: 1,
//     totalAmount: 0,
//     status: 'CONFIRMED'
//   };

//   isLoading: boolean = true;
//   isSubmitting: boolean = false;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private tourService: TourService,
//     private bookingService: BookingService,
//     private authService: AuthService
//   ) {}

//   ngOnInit() {
//     this.route.params.subscribe(params => {
//       this.tourId = +params['tourId'];
//       this.bookingData.tourId = this.tourId;
//       this.loadTourData();
//     });
//   }

//   loadTourData() {
//     this.tourService.getTourById(this.tourId).subscribe({
//       next: (tour) => {
//         this.tour = tour;
//         this.bookingData.totalAmount = tour.price * this.bookingData.numberOfGuests;
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error loading tour:', error);
//         this.router.navigate(['/tours']);
//       }
//     });
//   }

//   updateTotalAmount() {
//     if (this.tour) {
//       this.bookingData.totalAmount = this.tour.price * this.bookingData.numberOfGuests;
//     }
//   }

  // submitBooking() {
  //   if (!this.isFormValid()) {
  //     alert('Please fill all required fields');
  //     return;
  //   }

  //   this.isSubmitting = true;

  //   this.bookingService.createBooking(this.bookingData).subscribe({
  //     next: (response) => {
  //       console.log('Booking created:', response);
  //       // Navigate to confirmation page with booking reference
  //       this.router.navigate(['/booking-confirmation', response.id]);
  //     },
  //     error: (error) => {
  //       console.error('Booking error:', error);
  //       alert('Booking failed: ' + error.error?.message || 'Unknown error');
  //       this.isSubmitting = false;
  //     },
  //     complete: () => {
  //       this.isSubmitting = false;
  //     }
  //   });
  //   this.router.navigate(['/checkout'], { 
  //   state: { booking: this.bookingData, tour: this.tour } 
  // });
  // } 
//   submitBooking() {
//   if (!this.isFormValid()) {
//     alert('Please fill all required fields');
//     return;
//   }

//   this.isSubmitting = true;

//   this.bookingService.createBooking(this.bookingData).subscribe({
//     next: (response) => {
//       console.log('Booking created:', response);
//       // Only navigate to confirmation
//       this.router.navigate(['/booking-confirmation', response.id]);
//     },
//     error: (error) => {
//       console.error('Booking error:', error);
//       // alert('Booking failed: ' + error.error?.message || 'Unknown error');
//         alert('Booking failed: ' + (error.error?.message || error.statusText || 'Unknown error'));
//       this.isSubmitting = false;
//     }
//     // Remove the complete block with second navigation
//   });
//   // DELETE THIS LINE: this.router.navigate(['/checkout'], ...
// }

//   private isFormValid(): boolean {
//     return !!this.bookingData.travelDate && 
//            this.bookingData.numberOfGuests > 0;
//   }
//   getTodayDate(): string {
//   return new Date().toISOString().split('T')[0];
// }
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-booking',
//   templateUrl: './booking.component.html',
//   styleUrls: ['./booking.component.scss']
// })
// export class BookingComponent implements OnInit {
//   tour: any;
//   tourId: number = 0;
  
//   toursData: any = {
//     // ... your tours data ...
//     1: { 
//     title: 'Bali Paradise Tour', 
//     destination: 'Bali, Indonesia',
//     price: 899,
//     duration: 7,
//     image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2'
//   },
//   2: { 
//     title: 'Tokyo City Break', 
//     destination: 'Tokyo, Japan',
//     price: 1200,
//     duration: 5,
//     image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dG9reW98ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000'
//   },
//   3: { 
//     title: 'Paris Romantic Getaway', 
//     destination: 'Paris, France',
//     price: 1500,
//     duration: 5,
//     image: 'https://marleneonthemove.com/wp-content/uploads/2016/05/chris-karidis-nnzkZNYWHaU-unsplash.jpg'
//   },
//   4: { 
//     title: 'Dubai Luxury Experience', 
//     destination: 'Dubai, UAE',
//     price: 2200,
//     duration: 6,
//     image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'
//   },
//   5: { 
//     title: 'Makkah Spiritual Journey', 
//     destination: 'Makkah, Saudi Arabia',
//     price: 1800,
//     duration: 8,
//     image: 'https://plus.unsplash.com/premium_photo-1697730274057-19338e84db8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FhYmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500'
//   },
//   6: { 
//     title: 'Riyadh City Explorer', 
//     destination: 'Riyadh, Saudi Arabia',
//     price: 1100,
//     duration: 4,
//     image: 'https://plus.unsplash.com/premium_photo-1694475183306-4efa6a24f59c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//   },
//   7: { 
//     title: 'Bangkok Cultural Tour', 
//     destination: 'Bangkok, Thailand',
//     price: 950,
//     duration: 6,
//     image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a'
//   },
//   8: { 
//     title: 'Singapore City Adventure', 
//     destination: 'Singapore',
//     price: 1300,
//     duration: 5,
//     image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd'
//   },
//   9: { 
//     title: 'London Royal Tour', 
//     destination: 'London, UK',
//     price: 1700,
//     duration: 7,
//     image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'
//   },
//   10: { 
//     title: 'New York City Dreams', 
//     destination: 'New York, USA',
//     price: 1900,
//     duration: 6,
//     image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9'
//   },
//   11: { 
//     title: 'Sydney Coastal Escape', 
//     destination: 'Sydney, Australia',
//     price: 2100,
//     duration: 8,
//     image: 'https://images.unsplash.com/photo-1506973035872-a4erc16b8e8d9'
//   },
//   12: { 
//     title: 'Istanbul Cultural Heritage', 
//     destination: 'Istanbul, Turkey',
//     price: 1250,
//     duration: 7,
//     image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200'
//   },
//   13: { 
//     title: 'Cape Town Natural Wonders', 
//     destination: 'Cape Town, South Africa',
//     price: 1650,
//     duration: 9,
//     image: 'https://images.unsplash.com/photo-1484318571209-661cf29a69c3'
//   },
//   14: { 
//     title: 'Rome Historical Journey', 
//     destination: 'Rome, Italy',
//     price: 1400,
//     duration: 6,
//     image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5'
//   },
//   15: { 
//     title: 'Jeddah Red Sea Retreat', 
//     destination: 'Jeddah, Saudi Arabia',
//     price: 1200,
//     duration: 5,
//     image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96'
//   }
// };
  

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     // Get tour ID from route and load data
//     this.route.params.subscribe(params => {
//       this.tourId = +params['tourId'];
//       this.loadTourData(this.tourId);
//     });
//   }

//   private loadTourData(id: number) {
//     this.tour = this.toursData[id];
//     console.log('Loaded tour:', this.tour); // Check if data loads
//   }
// }