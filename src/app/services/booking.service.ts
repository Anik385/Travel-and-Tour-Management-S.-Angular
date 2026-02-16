import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Booking {
  id?: number;
  userId: number;
  tourId: number;
  flightId?: number;
  travelDate: string;
  numberOfGuests: number;
  totalAmount: number;
  status: string;
  bookingReference?: string;  // Add this
  bookingDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // updateBookingStatus(bookingId: string, newStatus: string) {
  //   throw new Error('Method not implemented.');
  // }
  // getAllBookings() {
  //   throw new Error('Method not implemented.');
  // }
  // Add these methods:
getAllBookings(): Observable<Booking[]> {
  return this.http.get<Booking[]>(`${this.apiUrl}/admin/bookings`);
}

updateBookingStatus(bookingId: string, status: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${bookingId}/status`, { status });
}
  private apiUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  // Create a new booking
  // createBooking(bookingData: Booking): Observable<Booking> {
  //   return this.http.post<Booking>(this.apiUrl, bookingData);
  // } 
  createBooking(data: any) {
  if (environment.useMockBooking) {
    return of({bookingReference: 'TRV-MOCK-' + Date.now()}); // Mock
  }
  return this.http.post(`${this.apiUrl}/bookings`, data); // Real
}

  // Get user's bookings
  getUserBookings(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Get booking by reference
  getBookingByReference(reference: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/reference/${reference}`);
  }

  // Cancel booking
  cancelBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}