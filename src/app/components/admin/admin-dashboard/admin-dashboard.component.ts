import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  recentBookings = [
    { id: 'TRV-784592', customer: 'John Doe', tour: 'Bali Paradise', amount: 1978, status: 'Confirmed' },
    { id: 'TRV-784591', customer: 'Jane Smith', tour: 'Tokyo City Break', amount: 1200, status: 'Confirmed' },
    { id: 'TRV-784590', customer: 'Mike Johnson', tour: 'Paris Getaway', amount: 1500, status: 'Confirmed' }
  ];

  popularTours = [
    { name: 'Bali Paradise Tour', bookings: 24 },
    { name: 'Tokyo City Break', bookings: 18 },
    { name: 'Paris Romantic Getaway', bookings: 15 },
    { name: 'Swiss Alps Adventure', bookings: 12 }
  ];
}