import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.scss']
})
export class RegistrationSuccessComponent implements OnInit {
  userName: string = 'Traveler';
  welcomeBonus: number = 50;

  ngOnInit() {
    // Get user data from registration form or service
    this.loadUserData();
  }

  private loadUserData() {
    // Logic to get actual user name from registration
    const userData = localStorage.getItem('newUser');
    if (userData) {
      this.userName = JSON.parse(userData).firstName || 'Traveler';
    }
  }

  startExploring() {
    // Logic to track user action and navigate
    console.log('User started exploring tours');
    // Could add analytics tracking here
  }

  goToDashboard() {
    // Logic for dashboard navigation
    console.log('Navigating to user dashboard');
    // Could pre-load user data here
  }
}
