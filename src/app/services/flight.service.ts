import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  // private apiUrl = `${environment.apiUrl}/flights`;
    private apiUrl = `${environment.apiUrl}`; // Already has /api
  private bookingData: any = {};

  constructor(private http: HttpClient) {}
  // Create
  // createFlight(flightData: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/flights`, flightData);
  // }
  createFlight(flightData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, flightData); // ✅ Remove /flights
    // ✅ Correct: http://localhost:8080/api/flights
  }
  // Read
  // getAllFlights(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/flights`);
  // }
 // ✅ CORRECT: /api/flights
  getAllFlights(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/flights`);
  }

  // ✅ CORRECT: /api/airports  
  getAirports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/airports`);
  }

  searchFlights(from: string, to: string, date: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/flights?departure.airport=${from}&arrival.airport=${to}&departure.date=${date}`
    );
  }

  getFlightById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/flights/${id}`);
  }
  // Update:
  updateFlight(id: string, flightData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/flights/${id}`, flightData);
  }
  // Delete:
  deleteFlight(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/flights/${id}`);
  }

 

  getDefaultFlights(): Observable<any[]> {
    return of([
      {
        id: '1',
        airline: 'Emirates',
        flightNumber: 'EK 123',
        departure: { airport: 'DXB', time: '08:00', date: '2024-03-20' },
        arrival: { airport: 'LHR', time: '12:00', date: '2024-03-20' },
        duration: '4h 00m',
        stops: 0,
        price: { economy: 500 },
        seatsAvailable: 150,
        aircraft: 'Boeing 777',
      },
      {
        id: '2',
        airline: 'Qatar Airways',
        flightNumber: 'QR 456',
        departure: { airport: 'DOH', time: '14:30', date: '2024-03-20' },
        arrival: { airport: 'CDG', time: '19:45', date: '2024-03-20' },
        duration: '5h 15m',
        stops: 0,
        price: { economy: 200 },
        seatsAvailable: 120,
        aircraft: 'Airbus A350',
      },
      {
        id: '3',
        airline: 'Singapore Airlines',
        flightNumber: 'SQ 789',
        departure: { airport: 'SIN', time: '23:15', date: '2024-03-20' },
        arrival: { airport: 'JFK', time: '06:30', date: '2024-03-21' },
        duration: '18h 15m',
        stops: 0,
        price: { economy: 900 },
        seatsAvailable: 80,
        aircraft: 'Airbus A380',
      },
      {
        id: '4',
        airline: 'Turkish Airlines',
        flightNumber: 'TK 202',
        departure: { airport: 'IST', time: '10:45', date: '2024-03-20' },
        arrival: { airport: 'BKK', time: '23:30', date: '2024-03-20' },
        duration: '9h 45m',
        stops: 0,
        price: { economy: 100 },
        seatsAvailable: 95,
        aircraft: 'Boeing 787',
      },
      {
        id: '5',
        airline: 'British Airways',
        flightNumber: 'BA 178',
        departure: { airport: 'LHR', time: '16:20', date: '2024-03-20' },
        arrival: { airport: 'DXB', time: '02:45', date: '2024-03-21' },
        duration: '6h 25m',
        stops: 0,
        price: { economy: 800 },
        seatsAvailable: 110,
        aircraft: 'Boeing 777',
      },
    ]);
  }

  // Data Sharing Methods
  setBookingData(flight: any, searchParams: any) {
    this.bookingData = { flight, searchParams };
  }

  getBookingData() {
    return this.bookingData;
  }

  clearBookingData() {
    this.bookingData = {};
  }
} // <--- End of Class

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class FlightService {
//   private apiUrl = 'http://localhost:3000'; // JSON Server URL
//   private bookingData: any = {};

//   constructor(private http: HttpClient) {}

//   // CREATE - Add new flight
//   createFlight(flightData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/flights`, flightData);
//   }

//   // READ - Get all flights
//   getAllFlights(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/flights`);
//   }

//   // READ - Search flights by route
//   searchFlights(from: string, to: string, date: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/flights?departure.airport=${from}&arrival.airport=${to}&departure.date=${date}`);
//   }

//   // READ - Get flight by ID
//   getFlightById(id: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/flights/${id}`);
//   }

//   // UPDATE - Update flight
//   updateFlight(id: string, flightData: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/flights/${id}`, flightData);
//   }

//   // DELETE - Delete flight
//   deleteFlight(id: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/flights/${id}`);
//   }

//   // Get airports for dropdowns
//   getAirports(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/airports`);
//   }

//   // Get cities for destination search
//   getCities(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/cities`);
//   }
//   getDefaultFlights() {
//   return of([
//     {
//       id: '1',
//       airline: 'Emirates',
//       flightNumber: 'EK 123',
//       departure: { airport: 'DXB', time: '08:00', date: '2024-03-20' },
//       arrival: { airport: 'LHR', time: '12:00', date: '2024-03-20' },
//       duration: '4h 00m',
//       stops: 0,
//       price: { economy: 500 },
//       seatsAvailable: 150,
//       aircraft: 'Boeing 777'
//     },
//     {
//       id: '2',
//       airline: 'Qatar Airways',
//       flightNumber: 'QR 456',
//       departure: { airport: 'DOH', time: '14:30', date: '2024-03-20' },
//       arrival: { airport: 'CDG', time: '19:45', date: '2024-03-20' },
//       duration: '5h 15m',
//       stops: 0,
//       price: { economy: 200 },
//       seatsAvailable: 120,
//       aircraft: 'Airbus A350'
//     },
//     {
//       id: '3',
//       airline: 'Singapore Airlines',
//       flightNumber: 'SQ 789',
//       departure: { airport: 'SIN', time: '23:15', date: '2024-03-20' },
//       arrival: { airport: 'JFK', time: '06:30', date: '2024-03-21' },
//       duration: '18h 15m',
//       stops: 0,
//       price: { economy: 900 },
//       seatsAvailable: 80,
//       aircraft: 'Airbus A380'
//     },
//     {
//       id: '4',
//       airline: 'Turkish Airlines',
//       flightNumber: 'TK 202',
//       departure: { airport: 'IST', time: '10:45', date: '2024-03-20' },
//       arrival: { airport: 'BKK', time: '23:30', date: '2024-03-20' },
//       duration: '9h 45m',
//       stops: 0,
//       price: { economy: 100 },
//       seatsAvailable: 95,
//       aircraft: 'Boeing 787'
//     },
//     {
//       id: '5',
//       airline: 'British Airways',
//       flightNumber: 'BA 178',
//       departure: { airport: 'LHR', time: '16:20', date: '2024-03-20' },
//       arrival: { airport: 'DXB', time: '02:45', date: '2024-03-21' },
//       duration: '6h 25m',
//       stops: 0,
//       price: { economy: 800 },
//       seatsAvailable: 110,
//       aircraft: 'Boeing 777'
//     }
//   ]);
// }
// setBookingData(flight: any, searchParams: any) {
//   this.bookingData = { flight, searchParams };
// }

// getBookingData() {
//   return this.bookingData;
// }

// clearBookingData() {
//   this.bookingData = {};
// }
// }
