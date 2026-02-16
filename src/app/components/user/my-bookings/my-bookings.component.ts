// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-my-bookings',
//   templateUrl: './my-bookings.component.html',
//   styleUrls: ['./my-bookings.component.scss']
// })
// export class MyBookingsComponent {

// } 

import { Component } from '@angular/core';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent {
  bookings = [
    {
      title: 'Bali Paradise Tour',
      destination: 'Bali, Indonesia',
      date: 'Mar 15-22, 2024',
      guests: 2,
      duration: 7,
      reference: 'TRV-784592',
      total: 1978,
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2'
    },
    {
      title: 'Tokyo City Break',
      destination: 'Tokyo, Japan',
      date: 'Apr 10-15, 2024',
      guests: 1,
      duration: 5,
      reference: 'TRV-784593',
      total: 1200,
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dG9reW98ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000'
    },
    {
      title: 'Paris Romantic Getaway',
      destination: 'Paris, France',
      date: 'Jan 5-10, 2024',
      guests: 2,
      duration: 5,
      reference: 'TRV-784590',
      total: 1500,
      status: 'completed',
      image: 'https://marleneonthemove.com/wp-content/uploads/2016/05/chris-karidis-nnzkZNYWHaU-unsplash.jpg'
    }
  ];
}
