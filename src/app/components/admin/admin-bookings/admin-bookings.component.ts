import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
    styleUrls: ['./admin-bookings.component.scss']

})
export class AdminBookingsComponent implements OnInit {
  bookings: any[] = [];
  isLoading = true;
  statusFilter: string = '';

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.isLoading = true;
    this.bookingService.getAllBookings().subscribe({
      next: (response: any) => {
        console.log('Bookings loaded:', response);
        this.bookings = response.map((booking: any) => ({
          id: booking.id,
          bookingReference: booking.bookingReference || `BK-${booking.id}`,
          userName: booking.userId ? `User ${booking.userId}` : 'Unknown',
          tourName: booking.tourId ? `Tour #${booking.tourId}` : '',
          flightName: booking.flightId ? `Flight #${booking.flightId}` : '',
          travelDate: booking.travelDate || booking.bookingDate || 'N/A',
          totalAmount: booking.totalAmount || 0,
          status: booking.status || 'PENDING'
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.isLoading = false;
        // Fallback to mock data for testing
        this.loadMockBookings();
      }
    });
  }

  // Temporary mock data for testing
  loadMockBookings() {
    this.bookings = [
      {
        id: 1,
        bookingReference: 'BK-20231201',
        userName: 'John Doe',
        tourName: 'Bali Paradise Tour',
        travelDate: '2025-12-15',
        totalAmount: 899.00,
        status: 'CONFIRMED'
      },
      {
        id: 2,
        bookingReference: 'BK-20231202',
        userName: 'Jane Smith',
        flightName: 'BG 101 (DAC-CXB)',
        travelDate: '2025-12-20',
        totalAmount: 150.00,
        status: 'CONFIRMED'
      },
      {
        id: 3,
        bookingReference: 'BK-20231203',
        userName: 'Mike Johnson',
        tourName: 'Tokyo City Break',
        travelDate: '2026-01-10',
        totalAmount: 1200.00,
        status: 'CANCELLED'
      }
    ];
    this.isLoading = false;
  }

  updateStatus(bookingId: number, status: string) {
    if (confirm(`Change booking status to ${status}?`)) {
      this.bookingService.updateBookingStatus(bookingId.toString(), status).subscribe({
        next: () => {
          alert('Booking status updated');
          this.loadBookings();
        },
        error: (error) => {
          console.error('Error updating status:', error);
          // Update locally for testing
          const booking = this.bookings.find(b => b.id === bookingId);
          if (booking) booking.status = status;
        }
      });
    }
  }

  get filteredBookings() {
    if (!this.statusFilter) return this.bookings;
    return this.bookings.filter(booking => 
      booking.status === this.statusFilter
    );
  }

  getTotalRevenue(): number {
    return this.bookings
      .filter(b => b.status === 'CONFIRMED')
      .reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
  }
}


// import { Component, OnInit } from '@angular/core';
// import { BookingService } from '../../../services/booking.service';

// @Component({
//   selector: 'app-admin-bookings',
//   templateUrl: './admin-bookings.component.html'
// })
// export class AdminBookingsComponent implements OnInit {
//   bookings: any[] = [];
//   filteredBookings: any[] = [];
//   statusFilter: string = '';

//   constructor(private bookingService: BookingService) {}

//   ngOnInit() {
//     this.loadBookings();
//   }
//     loadBookings() {
//   this.bookingService.getAllBookings().subscribe({
//     next: (bookings) => {
//       this.bookings = bookings;
//       this.filteredBookings = bookings;
//     },
//     error: (error) => console.error('Error loading bookings:', error)
//   });
// }

// updateStatus(bookingId: number, status: string) {
//   this.bookingService.updateBookingStatus(bookingId.toString(), status).subscribe({
//     next: () => {
//       alert('Booking status updated');
//       this.loadBookings(); // Refresh
//     },
//     error: (error) => console.error('Error updating status:', error)
//   });
// }

//   // loadBookings() {
//   //   // Implement after adding getAllBookings() to service
//   // } 
//   // updateStatus(bookingId: number, status: string) {
//   //   // Update booking status
//   // }

//   getTotalRevenue(): number {
//     return this.bookings.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
//   }
// }