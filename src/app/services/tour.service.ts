import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Tour {

  id: number;
  title: string;
  destination: string;
  duration: number;
  price: number;
  description: string;
  images: string[];
    itinerary?: ItineraryDay[];  // Add this
  inclusions?: string[];       // Add this
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}


@Injectable({
  providedIn: 'root'
})
export class TourService {
  private apiUrl = `${environment.apiUrl}/tours`;

  constructor(private http: HttpClient) {}

  // Get all tours
  getAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.apiUrl);
  }

  // Get single tour by ID
  getTourById(id: number): Observable<Tour> {
  return this.http.get<Tour>(`${this.apiUrl}/${id}`);
}

  // Search tours
  searchTours(searchTerm: string): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.apiUrl}/search?q=${searchTerm}`);
  }

  // Get tours by destination
  getToursByDestination(destination: string): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.apiUrl}/destination/${destination}`);
  }
}