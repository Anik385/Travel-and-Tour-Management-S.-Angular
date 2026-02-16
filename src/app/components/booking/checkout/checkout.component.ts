import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../../services/tour.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  booking: any = {
    tour: { title: '', image: '', price: 0 },
    guests: 1,
    date: '',
    subtotal: 0,
    taxes: 0,
    total: 0
  };
  
  payment = {
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  };
  
  saveCard: boolean = false;
  isProcessing: boolean = false;
  formSubmitted: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourService: TourService
  ) {}

  ngOnInit() {
    // Get data from navigation state (passed from booking page)
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as any;
    
    if (state?.bookingData && state?.tour) {
      // Use data from booking page
      this.loadDataFromState(state);
    } else {
      // Fallback: get from route params
      this.route.params.subscribe(params => {
        const tourId = +params['tourId'];
        this.loadTourData(tourId);
      });
    }
  }

  private loadDataFromState(state: any) {
    const bookingData = state.bookingData;
    const tour = state.tour;
    
    if (!tour || !bookingData) {
      this.router.navigate(['/tours']);
      return;
    }
    
    const subtotal = tour.price * bookingData.numberOfGuests;
    const taxes = Math.round(subtotal * 0.1); // 10% taxes
    const total = subtotal + taxes;
    
    this.booking = {
      tour: {
        title: tour.title,
        image: tour.images?.[0] || '',
        price: tour.price,
        destination: tour.destination
      },
      guests: bookingData.numberOfGuests,
      date: bookingData.travelDate || new Date().toLocaleDateString(),
      subtotal: subtotal,
      taxes: taxes,
      total: total
    };
    
    console.log('Checkout booking:', this.booking);
  }

  private loadTourData(tourId: number) {
    this.tourService.getTourById(tourId).subscribe({
      next: (tour) => {
        // Default values if no booking data
        const guests = 2;
        const subtotal = tour.price * guests;
        const taxes = Math.round(subtotal * 0.1);
        const total = subtotal + taxes;
        
        this.booking = {
          tour: {
            title: tour.title,
            image: tour.images?.[0] || '',
            price: tour.price,
            destination: tour.destination
          },
          guests: guests,
          date: new Date().toLocaleDateString(),
          subtotal: subtotal,
          taxes: taxes,
          total: total
        };
      },
      error: () => {
        this.router.navigate(['/tours']);
      }
    });
  }

  processPayment() {
    this.formSubmitted = true;
    
    if (!this.isPaymentValid()) {
      alert('Please fill all payment details correctly');
      return;
    }

    if (!this.isCardValid()) {
      alert('Please enter valid card details');
      return;
    }

    const confirmed = confirm(`Confirm payment of $${this.booking.total}?`);
    if (!confirmed) return;

    this.isProcessing = true;
    
    setTimeout(() => {
      this.isProcessing = false;
      
      const bookingRef = 'TRV-' + Date.now();
      
      this.router.navigate(['/booking-confirmation'], {
        state: {
          bookingReference: bookingRef,
          tour: this.booking.tour,
          guests: this.booking.guests,
          date: this.booking.date,
          total: this.booking.total,
          status: 'CONFIRMED',
          type: 'TOUR'
        }
      });
    }, 2000);
  }

  private isPaymentValid(): boolean {
    return !!this.payment.cardNumber && 
           !!this.payment.expiry && 
           !!this.payment.cvv && 
           !!this.payment.name;
  }

  private isCardValid(): boolean {
    if (this.selectedMethod !== 'card') return true;
    
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;
    
    const cleanCard = this.payment.cardNumber.replace(/\s/g, '');
    
    return cardRegex.test(cleanCard) &&
           expiryRegex.test(this.payment.expiry) &&
           cvvRegex.test(this.payment.cvv) &&
           this.payment.name.trim().length > 0;
  }

  formatCardNumber() {
    let value = this.payment.cardNumber.replace(/\D/g, '');
    value = value.substring(0, 16);
    let formatted = '';
    
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += value[i];
    }
    
    this.payment.cardNumber = formatted;
  }

  formatExpiry() {
    let value = this.payment.expiry.replace(/\D/g, '');
    if (value.length >= 2) {
      this.payment.expiry = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
  }

  // Add this missing property
  selectedMethod: string = 'card';
}

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.scss']
// })
// export class CheckoutComponent implements OnInit {
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
//       image: 'https://marleneonthemove.com/wp-content/uploads/2016/05/chris-karidis-nnzkZNYWHaU-unsplash.jpg'
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
//       const tourId = +params['tourId']; // Default to Makkah (ID: 5)
//       this.loadBookingData(tourId);
//     });
//   }

//   private loadBookingData(tourId: number) {
//     const tour = this.toursData[tourId];
//     const guests = 2;
//     const subtotal = tour.price * guests;
//     const taxes = Math.round(subtotal * 0.1); // 10% taxes
//     const total = subtotal + taxes;

//     this.booking = {
//       tour: tour,
//       guests: guests,
//       date: '2025-03-15',
//       subtotal: subtotal,
//       taxes: taxes,
//       total: total
//     };
//   }

//   proceedToConfirmation() {
//     // Navigate to confirmation with tour ID
//     const tourId = this.route.snapshot.params['tourId'] || 5;
//     window.location.href = `/confirmation/${tourId}`;
//   }
// }