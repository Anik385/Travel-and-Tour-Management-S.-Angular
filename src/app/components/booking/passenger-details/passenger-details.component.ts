import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
    styleUrls: ['./passenger-details.component.scss']  // Add this line
})
export class PassengerDetailsComponent implements OnInit {
  flight: any;
  passengers: any[] = [{ name: '', email: '', phone: '', passport: '' }];
  
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.flight = history.state.flight;
    if (!this.flight) this.router.navigate(['/flights']);
  }

  addPassenger() {
    this.passengers.push({ name: '', email: '', phone: '', passport: '' });
  }

  removePassenger(index: number) {
    if (this.passengers.length > 1) this.passengers.splice(index, 1);
  }

  proceedToPayment() {
    const bookingData = {
      flight: this.flight,
      passengers: this.passengers,
      total: history.state.total
    };
    this.router.navigate(['/payment'], { state: bookingData });
  }
  isFormValid(): boolean {
  return this.passengers.every(p => p.name && p.email && p.phone);
}
}