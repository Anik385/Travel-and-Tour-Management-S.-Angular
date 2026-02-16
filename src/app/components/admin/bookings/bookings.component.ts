// import { Component, OnInit } from "@angular/core";
// import { Booking, BookingService } from "src/app/services/booking.service";


// // admin/bookings/bookings.component.ts
// @Component({
//   selector: 'app-admin-bookings',
//   templateUrl: './bookings.component.html'
// })
// export class AdminBookingsComponent implements OnInit {
//   bookings: Booking[] = [];
//   filteredBookings: Booking[] = [];
//   statusFilter = 'all';
  
//   constructor(private bookingService: BookingService) {}
  
//   ngOnInit() {
//     this.loadBookings();
//   }
  
//   loadBookings() {
//     this.bookingService.getAllBookings().subscribe(bookings => {
//       this.bookings = bookings;
//       this.filterBookings();
//     });
//   }
  
//   filterBookings() {
//     if (this.statusFilter === 'all') {
//       this.filteredBookings = this.bookings;
//     } else {
//       this.filteredBookings = this.bookings.filter(
//         b => b.status === this.statusFilter
//       );
//     }
//   }
  
//   updateStatus(bookingId: string, newStatus: string) {
//     this.bookingService.updateBookingStatus(bookingId, newStatus)
//       .subscribe(() => this.loadBookings());
//   }
// }
