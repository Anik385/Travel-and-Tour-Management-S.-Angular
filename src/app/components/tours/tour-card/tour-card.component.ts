
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.scss']
})
export class TourCardComponent {
  @Input() tour: any; // Should match Tour interface
  
  constructor(private router: Router) {}

  // Navigate to tour details
  viewTourDetails() {
    this.router.navigate(['/tours', this.tour.id]);
  }
}
