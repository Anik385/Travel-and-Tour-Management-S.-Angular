import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})

export class UserDashboardComponent implements OnInit {
  userName: string = 'Guest'; // ✅ Add property
  upcomingTrips = [
        {
      title: 'Bali Paradise Tour',
      destination: 'Bali, Indonesia',
      date: 'Mar 15-22, 2024',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
      status: 'confirmed'
    },
    {
      title: 'Tokyo City Break',
      destination: 'Tokyo, Japan',
      date: 'Apr 10-15, 2024',
      image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dG9reW98ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
      status: 'confirmed'
    },
    {
      title: 'Shanghai',
      destination: 'Shanghai, China',
      date: 'Apr 10-15, 2025',
      image: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403',
      status: 'confirmed'
    }
  ]; // Keep your existing data

  constructor(private userService: UserService) {} // ✅ Add constructor

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.userName = user.firstName; // ✅ Use real API data
      },
      error: (error) => {
        console.error('Failed to load user:', error);
        this.userName = 'Guest';
      }
    });
  }
}
// export class UserDashboardComponent {
//   upcomingTrips = [

//   ];
// }