import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  activeTours: number;
  registeredUsers: number;
  recentBookings: any[];
  popularTours: any[];
}

export interface ReportData {
  salesByMonth: { month: string, amount: number }[];
  topDestinations: { name: string, bookings: number }[];
  userGrowth: { date: string, count: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  // Dashboard statistics
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`);
  }

  // Generate reports
  getSalesReport(startDate: string, endDate: string): Observable<ReportData> {
    return this.http.get<ReportData>(
      `${this.apiUrl}/reports/sales?start=${startDate}&end=${endDate}`
    );
  }

  // Get booking analytics
  getBookingAnalytics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/analytics/bookings`);
  }

  // Get user analytics
  getUserAnalytics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/analytics/users`);
  }

  // Export data
  exportData(format: 'csv' | 'excel' | 'pdf'): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export?format=${format}`, {
      responseType: 'blob'
    });
  }
}