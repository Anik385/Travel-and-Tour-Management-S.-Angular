
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-tour-form',
  templateUrl: './admin-tour-form.component.html',
  styleUrls: ['./admin-tour-form.component.scss']
})
export class AdminTourFormComponent {
  isEditMode: boolean = false;
  
  tour: any = {
    title: '',
    destination: '',
    duration: 7,
    price: 0,
    description: '',
    itinerary: [
      { day: 1, title: '', description: '' }
    ],
    images: [],
    inclusions: ['Accommodation', 'Breakfast', 'Tour Guide']
  };

  addDay() {
    const lastDay = this.tour.itinerary[this.tour.itinerary.length - 1];
    this.tour.itinerary.push({
      day: lastDay.day + 1,
      title: '',
      description: ''
    });
  }

  removeDay(index: number) {
    if (this.tour.itinerary.length > 1) {
      this.tour.itinerary.splice(index, 1);
      // Re-number days
      this.tour.itinerary.forEach((day: { day: number; title: string; description: string }, i: number) => day.day = i + 1);
    }
  }

  addInclusion() {
    this.tour.inclusions.push('');
  }

  removeInclusion(index: number) {
    if (this.tour.inclusions.length > 1) {
      this.tour.inclusions.splice(index, 1);
    }
  }

  onImageUpload(event: any) {
    const files = event.target.files;
    // Simulate image upload - in real app, upload to server
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.tour.images.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.tour.images.splice(index, 1);
  }

  saveTour() {
    console.log('Saving tour:', this.tour);
    alert('Tour saved successfully!');
    // In real app, navigate back to tours list
  }
}
