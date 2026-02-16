import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {
  booking: any = null;
  bookingData: any = null;
  isLoading: boolean = true;
  generatedReference: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Get data from route state (from payment page)
    this.bookingData = history.state;
    
    // Generate fallback reference if not provided
    this.generatedReference = 'TRV-' + Date.now();
    
    if (this.bookingData) {
      // Data passed from payment page
      this.booking = {
        bookingReference: this.bookingData.bookingReference || this.generatedReference,
        tourTitle: this.bookingData.tour?.title || this.bookingData.flight?.airline + ' Flight',
        date: this.bookingData.date || new Date().toLocaleDateString(),
        guests: this.bookingData.guests || this.bookingData.passengers?.length || 1,
        total: this.bookingData.total || 0
      };
      this.isLoading = false;
      
      // Log for debugging
      console.log('Confirmation data:', this.bookingData);
      console.log('Booking object:', this.booking);
    } else {
      // Fallback: simulate data
      this.loadBookingDetails();
    }
  }

  loadBookingDetails() {
    setTimeout(() => {
      this.booking = {
        bookingReference: this.generatedReference,
        tourTitle: 'Flight Booking',
        date: new Date().toLocaleDateString(),
        guests: 1,
        total: 450
      };
      this.isLoading = false;
    }, 1000);
  }

  downloadVoucher() {
    alert('Voucher downloaded!');
  }

  sendEmail() {
    alert('Confirmation sent to email!');
  }
}

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BookingService } from '../../../services/booking.service';

// @Component({
//   selector: 'app-booking-confirmation',
//   templateUrl: './booking-confirmation.component.html',
//   styleUrls: ['./booking-confirmation.component.scss']
// })
// export class BookingConfirmationComponent implements OnInit {
//   bookingId: number = 0;
//   booking: any = null;
//   isLoading: boolean = true;

//   constructor(
//     private route: ActivatedRoute,
//     private bookingService: BookingService
//   ) {}

//   ngOnInit() {
//     this.route.params.subscribe(params => {
//       this.bookingId = +params['id'];
//       this.loadBookingDetails();
//     });
//   }

//   loadBookingDetails() {
//     // In real app, you'd have a getBookingById method
//     // For now, simulate success
//     setTimeout(() => {
//       this.booking = {
//         bookingReference: 'TRV-' + Math.floor(100000 + Math.random() * 900000),
//         tourTitle: 'Bali Paradise Tour',
//         date: new Date().toLocaleDateString(),
//         guests: 2,
//         total: 1798
//       };
//       this.isLoading = false;
//     }, 1000);
//   }

//   downloadVoucher() {
//     alert('Voucher downloaded!');
//   }

//   sendEmail() {
//     alert('Confirmation sent to email!');
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-booking-confirmation',
//   templateUrl: './booking-confirmation.component.html',
//   styleUrls: ['./booking-confirmation.component.scss']
// })
// export class BookingConfirmationComponent implements OnInit {
//   booking: any;
  
//   toursData: any = {
//     1: { 
//       title: 'Bali Paradise Tour', 
//       destination: 'Bali, Indonesia',
//       price: 899,
//       duration: 7,
//       image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2'
//     },
//     2: { 
//       title: 'Tokyo City Break', 
//       destination: 'Tokyo, Japan',
//       price: 1200,
//       duration: 5,
//       image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dG9reW98ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000'
//     },
//     3: { 
//       title: 'Paris Romantic Getaway', 
//       destination: 'Paris, France',
//       price: 1500,
//       duration: 5,
//       image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52'
//     },
//     4: { 
//       title: 'Dubai Luxury Experience', 
//       destination: 'Dubai, UAE',
//       price: 2200,
//       duration: 6,
//       image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'
//     },
//     5: { 
//       title: 'Makkah Spiritual Journey', 
//       destination: 'Makkah, Saudi Arabia',
//       price: 1800,
//       duration: 8,
//       image: 'https://plus.unsplash.com/premium_photo-1697730274057-19338e84db8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FhYmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500'
//     },
//     6: { 
//       title: 'Riyadh City Explorer', 
//       destination: 'Riyadh, Saudi Arabia',
//       price: 1100,
//       duration: 4,
//       image: 'https://images.unsplash.com/photo-1540322412357-8ac1479a52de'
//     },
//     7: { 
//       title: 'Bangkok Cultural Tour', 
//       destination: 'Bangkok, Thailand',
//       price: 950,
//       duration: 6,
//       image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a'
//     },
//     8: { 
//       title: 'Singapore City Adventure', 
//       destination: 'Singapore',
//       price: 1300,
//       duration: 5,
//       image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd'
//     },
//     9: { 
//       title: 'London Royal Tour', 
//       destination: 'London, UK',
//       price: 1700,
//       duration: 7,
//       image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'
//     },
//     10: { 
//       title: 'New York City Dreams', 
//       destination: 'New York, USA',
//       price: 1900,
//       duration: 6,
//       image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9'
//     },
//     11: { 
//       title: 'Sydney Coastal Escape', 
//       destination: 'Sydney, Australia',
//       price: 2100,
//       duration: 8,
//       image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9'
//     },
//     12: { 
//       title: 'Istanbul Cultural Heritage', 
//       destination: 'Istanbul, Turkey',
//       price: 1250,
//       duration: 7,
//       image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200'
//     },
//     13: { 
//       title: 'Cape Town Natural Wonders', 
//       destination: 'Cape Town, South Africa',
//       price: 1650,
//       duration: 9,
//       image: 'https://images.unsplash.com/photo-1484318571209-661cf29a69c3'
//     },
//     14: { 
//       title: 'Rome Historical Journey', 
//       destination: 'Rome, Italy',
//       price: 1400,
//       duration: 6,
//       image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5'
//     },
//     15: { 
//       title: 'Jeddah Red Sea Retreat', 
//       destination: 'Jeddah, Saudi Arabia',
//       price: 1200,
//       duration: 5,
//       image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96'
//     }
//   };

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit() {
//     // Get tour ID from route parameters
//     this.route.params.subscribe(params => {
//       const tourId = +params['tourId'] || 5; // Default to Makkah (ID: 5)
//       this.loadBookingData(tourId);
//     });
//   }

//   private loadBookingData(tourId: number) {
//     const tour = this.toursData[tourId];
    
//     this.booking = {
//       reference: 'TRV-' + Math.floor(100000 + Math.random() * 900000),
//       tour: tour,
//       date: this.getFutureDate(30), // 30 days from now
//       guests: 2,
//       total: tour.price * 2
//     };
//   }

//   private getFutureDate(days: number): string {
//     const date = new Date();
//     date.setDate(date.getDate() + days);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     });
//   }

//   downloadVoucher() {
//     alert('Downloading voucher...');
//   }

//   sendEmail() {
//     alert('Confirmation sent to email!');
//   }
// }
