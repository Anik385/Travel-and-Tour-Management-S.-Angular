import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'fa-credit-card' },
    { id: 'paypal', name: 'PayPal', icon: 'fa-paypal' },
    { id: 'bank', name: 'Bank Transfer', icon: 'fa-university' }
  ];
  
  selectedMethod = 'card';
  bookingData: any;
  payment = { 
    cardNumber: '', 
    expiry: '', 
    cvv: '', 
    name: '' 
  };
  saveCard: boolean = false;
  isProcessing: boolean = false;
  
  constructor(
    private router: Router, 
    private bookingService: BookingService
  ) {}

  getBaseFare(): number {
  if (this.bookingData?.flight) {
    const basePrice = this.bookingData.flight.price?.economy || 
                     this.bookingData.flight.price || 0;
    return basePrice * (this.bookingData.passengers?.length || 1);
  } else if (this.bookingData?.tour) {
    return this.bookingData.tour.price * (this.bookingData.guests || 1);
  }
  return 0;
}

getTaxes(): number {
  return Math.round(this.getBaseFare() * 0.15); // 15% taxes
}

  ngOnInit() {
    this.bookingData = history.state;
    console.log('Payment data:', this.bookingData);
    
    if (!this.bookingData?.tour && !this.bookingData?.flight) {
      alert('No booking data found');
      this.router.navigate(['/tours']);
    }
  }

  processPayment() {
    // Validate payment
    if (this.selectedMethod === 'card' && !this.isCardValid()) {
      alert('Please enter valid card details');
      return;
    }
    
    this.isProcessing = true;
    
    // Check if using mock or real backend
    if (environment.useMockBooking) {
      this.processMockPayment();
    } else {
      this.processRealPayment();
    }
  }

  private processRealPayment() {
    // Prepare booking data for backend
    const bookingDTO: any = {
      userId: this.getUserIdFromToken() || 1, // Get from token
      tourId: this.bookingData.tour?.id || null,
      flightId: this.bookingData.flight?.id || null,
      travelDate: this.bookingData.travelDate || new Date().toISOString().split('T')[0],
      numberOfGuests: this.bookingData.passengers?.length || this.bookingData.guests || 1,
      totalAmount: this.getTotal(),
      status: 'CONFIRMED'
    };

    // Call real backend API
    this.bookingService.createBooking(bookingDTO).subscribe({
      next: (response: any) => {
        this.isProcessing = false;
        console.log('Booking API success:', response);
        
        // Navigate to confirmation with REAL backend data
        this.navigateToConfirmation(
          response.bookingReference, // REAL reference from backend
          response.id, // REAL booking ID
          response
        );
      },
      error: (err) => {
        this.isProcessing = false;
        console.error('Booking API error:', err);
        
        // Fallback to mock if API fails
        alert('Payment processed, but booking save failed. Reference saved locally.');
        this.processMockPayment();
      }
    });
  }

  private processMockPayment() {
    // Simulate API delay
    setTimeout(() => {
      this.isProcessing = false;
      
      const mockReference = 'TRV-MOCK-' + Date.now();
      const mockId = Math.floor(Math.random() * 1000);
      
      // Save to localStorage for testing
      const mockBooking = {
        id: mockId,
        bookingReference: mockReference,
        tourId: this.bookingData.tour?.id,
        flightId: this.bookingData.flight?.id,
        totalAmount: this.getTotal(),
        date: new Date().toISOString(),
        status: 'CONFIRMED'
      };
      
      this.saveMockBooking(mockBooking);
      this.navigateToConfirmation(mockReference, mockId, mockBooking);
    }, 1500);
  }

  private navigateToConfirmation(reference: string, bookingId: number, apiResponse?: any) {
    this.router.navigate(['/booking-confirmation'], {
      state: {
        // REAL data from backend (or mock)
        bookingReference: reference,
        bookingId: bookingId,
        apiResponse: apiResponse,
        
        // Booking details
        type: this.bookingData.flight ? 'FLIGHT' : 'TOUR',
        tour: this.bookingData.tour,
        flight: this.bookingData.flight,
        passengers: this.bookingData.passengers,
        guests: this.bookingData.guests || this.bookingData.passengers?.length || 1,
        travelDate: this.bookingData.travelDate,
        total: this.getTotal(),
        status: 'CONFIRMED',
        paymentMethod: this.selectedMethod,
        bookingDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        
        // For debugging
        isMock: environment.useMockBooking,
        backendConnected: !environment.useMockBooking
      }
    });
  }

  private saveMockBooking(booking: any) {
    // Save to localStorage for testing
    const mockBookings = JSON.parse(localStorage.getItem('mockBookings') || '[]');
    mockBookings.push(booking);
    localStorage.setItem('mockBookings', JSON.stringify(mockBookings));
  }

  private getUserIdFromToken(): number {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.userId || payload.sub || 1;
      }
    } catch (e) {
      console.error('Token parse error:', e);
    }
    return 1; // Default
  }

  getTotal(): number {
    return this.bookingData?.total || 
           this.bookingData?.flight?.price?.economy || 
           this.bookingData?.tour?.price || 
           0;
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
           this.payment.name.trim().length > 2;
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
}

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { BookingService } from '../../../services/booking.service';

// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.scss'],
// })
// export class PaymentComponent implements OnInit {
//   paymentMethods = [
//     { id: 'card', name: 'Credit/Debit Card', icon: 'fa-credit-card' },
//     { id: 'paypal', name: 'PayPal', icon: 'fa-paypal' },
//     { id: 'bank', name: 'Bank Transfer', icon: 'fa-university' },
//   ];

//   selectedMethod = 'card';
//   bookingData: any;
//   payment = {
//     cardNumber: '',
//     expiry: '',
//     cvv: '',
//     name: '',
//   };
//   saveCard: boolean = false;
//   isProcessing: boolean = false;

//   constructor(private router: Router, private bookingService: BookingService) {}

//   ngOnInit() {
//     this.bookingData = history.state;
//     console.log('Flight booking data:', this.bookingData);

//     if (!this.bookingData?.flight) {
//       alert('No flight data found. Please search for flights first.');
//       this.router.navigate(['/flights']);
//     }
//   }

//   processPayment() {
//     // Validate payment for card method
//     if (this.selectedMethod === 'card') {
//       if (!this.isCardValid()) {
//         alert('Please enter valid card details');
//         return;
//       }
//     }

//     this.isProcessing = true;

//     // Check if we should skip API (for testing)
//     const skipApi = confirm('Skip API and go to confirmation? (For testing)');

//     if (skipApi) {
//       // Simulate success without API call
//       setTimeout(() => {
//         this.isProcessing = false;
//         this.navigateToConfirmation();
//       }, 1500);
//     } else {
//       // Try real API call
//       this.callBookingApi();
//     }
//   }

//   private callBookingApi() {
//     const bookingDTO: any = {
//       userId: 1,
//       tourId: null,
//       flightId: this.bookingData.flight.id,
//       travelDate: this.bookingData.flight.departure.date,
//       numberOfGuests: this.bookingData.passengers?.length || 1,
//       totalAmount: this.getTotal(),
//       status: 'CONFIRMED',
//     };

//     this.bookingService.createBooking(bookingDTO).subscribe({
//       next: (response: any) => {
//         this.isProcessing = false;
//         this.navigateToConfirmation(response.bookingReference);
//       },
//       error: (err) => {
//         this.isProcessing = false;
//         console.error('Payment Error:', err);

//         if (err.status === 403 || err.status === 401) {
//           const retry = confirm(
//             'Authentication failed. Do you want to skip API and continue to confirmation?'
//           );
//           if (retry) {
//             this.navigateToConfirmation();
//           }
//         } else {
//           alert(
//             'Booking error: ' +
//               (err.error?.message || err.message || 'Unknown error')
//           );
//         }
//       },
//     });
//   }

//   private navigateToConfirmation(reference?: string) {
//     const bookingRef = reference || 'TRV-FL-' + Date.now();

//     this.router.navigate(['/booking-confirmation'], {
//       state: {
//         bookingReference: bookingRef,
//         type: 'FLIGHT',
//         flight: this.bookingData.flight,
//         passengers: this.bookingData.passengers,
//         total: this.getTotal(),
//         bookingDate: new Date().toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric',
//         }),
//         guests: this.bookingData.passengers?.length || 1,
//       },
//     });
//   }

//   getBaseFare(): number {
//     const basePrice =
//       this.bookingData?.flight?.price?.economy ||
//       this.bookingData?.flight?.price ||
//       0;
//     const passengers = this.bookingData?.passengers?.length || 1;
//     return basePrice * passengers;
//   }

//   getTaxes(): number {
//     return Math.round(this.getBaseFare() * 0.15); // 15% taxes
//   }

//   getTotal(): number {
//     return this.getBaseFare() + this.getTaxes();
//   }

//   // Card validation methods (keep from previous code)
//   private isCardValid(): boolean {
//     if (this.selectedMethod !== 'card') return true;

//     const cardRegex = /^\d{16}$/;
//     const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
//     const cvvRegex = /^\d{3}$/;

//     const cleanCard = this.payment.cardNumber.replace(/\s/g, '');

//     return (
//       cardRegex.test(cleanCard) &&
//       expiryRegex.test(this.payment.expiry) &&
//       cvvRegex.test(this.payment.cvv) &&
//       this.payment.name.trim().length > 2
//     );
//   }

//   private savePaymentMethod() {
//     const lastFour = this.payment.cardNumber.slice(-4);
//     const savedCard = {
//       lastFour: lastFour,
//       expiry: this.payment.expiry,
//       type: this.getCardType(),
//     };

//     localStorage.setItem('saved_card', JSON.stringify(savedCard));
//   }

//   private getCardType(): string {
//     const firstDigit = this.payment.cardNumber.charAt(0);
//     if (firstDigit === '4') return 'Visa';
//     if (firstDigit === '5') return 'MasterCard';
//     if (firstDigit === '3') return 'American Express';
//     return 'Unknown';
//   }

//   formatCardNumber() {
//     let value = this.payment.cardNumber.replace(/\D/g, '');
//     value = value.substring(0, 16);
//     let formatted = '';

//     for (let i = 0; i < value.length; i++) {
//       if (i > 0 && i % 4 === 0) formatted += ' ';
//       formatted += value[i];
//     }

//     this.payment.cardNumber = formatted;
//   }

//   formatExpiry() {
//     let value = this.payment.expiry.replace(/\D/g, '');
//     if (value.length >= 2) {
//       this.payment.expiry = value.substring(0, 2) + '/' + value.substring(2, 4);
//     }
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { BookingService } from '../../../services/booking.service';

// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.scss']
// })
// export class PaymentComponent implements OnInit {
//   bookingData: any;
//   payment = { method: 'card', cardNumber: '', expiry: '', cvv: '', name: '' };

//   constructor(private router: Router, private bookingService: BookingService) {}

//   ngOnInit() {
//     this.bookingData = history.state;
//     if (!this.bookingData.flight) this.router.navigate(['/flights']);
//   }

//   processPayment() {
//   const bookingDTO: any = {
//     userId: 1,
//     tourId: null, // <--- ADD THIS LINE (or 0) to satisfy the Booking interface
//     flightId: this.bookingData.flight.id,
//     travelDate: this.bookingData.flight.departure.date,
//     numberOfGuests: this.bookingData.passengers.length,
//     totalAmount: this.bookingData.total,
//     status: 'CONFIRMED'
//   };

//   this.bookingService.createBooking(bookingDTO).subscribe({
//     next: (response: any) => {
//       this.router.navigate(['/booking-confirmation', response.bookingReference]);
//     },
//     error: (err) => {
//       console.error('Payment Error:', err);
//       alert('There was an error processing your booking.');
//     }
//   });
//   }

//   getTotal(): number {
//     return this.bookingData?.total || 0;

//   }
// }
