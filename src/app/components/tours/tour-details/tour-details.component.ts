import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService, Tour } from '../../../services/tour.service';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.scss']
})
export class TourDetailsComponent implements OnInit {
  tourId: number = 0;
  tour: Tour | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourService: TourService
  ) {}

  ngOnInit() {
    // Get tour ID from URL
    this.route.params.subscribe(params => {
      this.tourId = +params['id']; // Convert to number
      this.loadTourDetails(this.tourId);
    });
  }

  loadTourDetails(id: number) {
    this.isLoading = true;
    this.tourService.getTourById(id).subscribe({
      next: (tourData) => {
        this.tour = tourData;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tour:', error);
        this.errorMessage = 'Tour not found';
        this.isLoading = false;
        // Redirect to tours list after 3 seconds
        setTimeout(() => this.router.navigate(['/tours']), 3000);
      }
    });
  }

  // Navigate to booking page
  bookTour() {
    if (this.tour) {
      this.router.navigate(['/booking', this.tour.id]);
    }
  }
}


// import { Router } from '@angular/router';

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-tour-details',
//   templateUrl: './tour-details.component.html',
//   styleUrls: ['./tour-details.component.scss']
// })
// export class TourDetailsComponent implements OnInit {
//   tourId: number = 0;
//   tour: any = null;

//   // All tours data - make sure IDs match your tour-list IDs
//   toursData: any = {
//     1: {
//       id: 1,
//       title: 'Bali Paradise Tour',
//       destination: 'Bali, Indonesia',
//       duration: 7,
//       rating: 4.8,
//       reviews: 124,
//       price: 899,
//       description: 'Experience the perfect blend of culture, adventure, and relaxation in beautiful Bali.',
//       images: [
//         'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
//         'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1'
//       ],
//       itinerary: [
//         { day: 1, title: 'Arrival in Bali', description: 'Airport pickup and transfer to your luxury resort.' }
//       ],
//       inclusions: ['4-star accommodation', 'Daily breakfast', 'Airport transfers']
//     },
//     2: {
//       id: 2,
//       title: 'Tokyo City Break',
//       destination: 'Tokyo, Japan', 
//       duration: 5,
//       rating: 4.6,
//       reviews: 89,
//       price: 1200,
//       description: 'Immerse yourself in the vibrant culture of Tokyo.',
//       images: [
//         'https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dG9reW98ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
//         'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65'
//       ],
//       itinerary: [
//         { day: 1, title: 'Arrival in Tokyo', description: 'Arrive at Narita Airport and transfer to hotel.' }
//       ],
//       inclusions: ['3-star hotel accommodation', 'Daily breakfast', 'Guided city tours']
//     },
//     3: {
//       id: 3,
//       title: 'Paris Romantic Getaway',
//       destination: 'Paris, France',
//       duration: 5,
//       rating: 4.9,
//       reviews: 156,
//       price: 1500,
//       description: 'Romantic tour through the city of love.',
//       images: [
//         'https://marleneonthemove.com/wp-content/uploads/2016/05/chris-karidis-nnzkZNYWHaU-unsplash.jpg',
//         'https://images.unsplash.com/photo-1431274172761-fca41d930114'
//       ],
//       itinerary: [
//         { day: 1, title: 'Arrival in Paris', description: 'Check into your romantic hotel near Eiffel Tower.' }
//       ],
//       inclusions: ['4-star hotel', 'Daily breakfast', 'Eiffel Tower tickets']
//     },
//     4: {
//       id: 4,
//       title: 'Dubai Luxury Experience',
//       destination: 'Dubai, UAE',
//       duration: 6,
//       rating: 4.7,
//       reviews: 203,
//       price: 2200,
//       description: 'Indulge in the ultimate luxury experience in Dubai.',
//       images: [
//         'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
//         'https://images.unsplash.com/photo-1518684079-3c830dcef090'
//       ],
//       itinerary: [
//         { day: 1, title: 'Arrival in Dubai', description: 'Luxury airport transfer to Burj Khalifa hotel.' }
//       ],
//       inclusions: ['5-star luxury accommodation', 'All meals included', 'Desert safari']
//     },
//     5: {
//       id: 5,
//       title: 'Makkah Spiritual Journey',
//       destination: 'Makkah, Saudi Arabia',
//       duration: 8,
//       rating: 4.9,
//       reviews: 312,
//       price: 1800,
//       description: 'Embark on a spiritual journey to the holy city of Makkah.',
//       images: [
//         'https://plus.unsplash.com/premium_photo-1697730274057-19338e84db8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FhYmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500',
//         'https://images.unsplash.com/photo-1547996167-8b4a8d08a5ff'
//       ],
//       itinerary: [
//         { day: 1, title: 'Arrival in Jeddah', description: 'Transfer to Makkah and hotel check-in.' }
//       ],
//       inclusions: ['5-star hotel near Haram', 'All meals (Halal)', 'Umrah visa processing']
//     },
//     6: {  // Add this for Riyadh City Explorer (ID 6)
//     id: 6,
//     title: 'Riyadh City Explorer',
//     destination: 'Riyadh, Saudi Arabia',
//     duration: 4,
//     rating: 4.5,
//     reviews: 67,
//     price: 1100,
//     description: 'Discover the modern capital of Saudi Arabia with its stunning architecture and rich heritage.',
//     images: [
//       'https://plus.unsplash.com/premium_photo-1694475183306-4efa6a24f59c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       'https://images.unsplash.com/photo-1577078313256-779b8d3c5de6'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Riyadh', description: 'Check into luxury hotel in business district.' },
//       { day: 2, title: 'Modern Riyadh', description: 'Kingdom Centre and Al Faisaliyah Tower with city views.' }
//     ],
//     inclusions: ['5-star hotel', 'Daily breakfast', 'Murabba Palace', 'Traditional dinner experience']
//   },
//     7: {
//     id: 7,
//     title: 'Bangkok Cultural Tour',
//     destination: 'Bangkok, Thailand',
//     duration: 6,
//     rating: 4.4,
//     reviews: 98,
//     price: 950,
//     description: 'Discover the rich culture and vibrant street life of Bangkok with temple visits and authentic Thai cuisine experiences.',
//     images: [
//       'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
//       'https://images.unsplash.com/photo-1528181304800-259b08848526'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Bangkok', description: 'Transfer to hotel and evening street food tour at Yaowarat Road.' },
//       { day: 2, title: 'Grand Palace & Temples', description: 'Visit Wat Phra Kaew and Wat Arun with expert local guide.' }
//     ],
//     inclusions: ['4-star hotel', 'Daily breakfast', 'Temple entrance fees', 'Local guide']
//   },
//   8: {
//     id: 8,
//     title: 'Singapore City Adventure',
//     destination: 'Singapore',
//     duration: 5,
//     rating: 4.7,
//     reviews: 145,
//     price: 1300,
//     description: 'Explore the modern marvels and cultural diversity of Singapore, from Marina Bay to ethnic quarters.',
//     images: [
//       'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
//       'https://images.unsplash.com/photo-1531594896955-305cf81269f1'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Singapore', description: 'Check into hotel and evening at Gardens by the Bay light show.' },
//       { day: 2, title: 'Marina Bay Exploration', description: 'Visit Merlion Park, ArtScience Museum and Singapore Flyer.' }
//     ],
//     inclusions: ['4-star hotel', 'Daily breakfast', 'Gardens by the Bay ticket', 'MRT pass']
//   },
//   9: {
//     id: 9,
//     title: 'London Royal Tour',
//     destination: 'London, UK',
//     duration: 7,
//     rating: 4.6,
//     reviews: 178,
//     price: 1700,
//     description: 'Experience royal heritage and modern British culture in the historic city of London.',
//     images: [
//       'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
//       'https://images.unsplash.com/photo-1529655683826-aba9b3e77383'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in London', description: 'Hotel check-in and evening Thames River cruise.' },
//       { day: 2, title: 'Royal London', description: 'Buckingham Palace Changing of the Guard and Westminster Abbey tour.' }
//     ],
//     inclusions: ['4-star central hotel', 'Daily breakfast', 'Oyster card', 'Royal palace tickets']
//   },
//   10: {
//     id: 10,
//     title: 'New York City Dreams',
//     destination: 'New York, USA',
//     duration: 6,
//     rating: 4.8,
//     reviews: 234,
//     price: 1900,
//     description: 'Live the New York dream with iconic landmarks, Broadway shows, and cosmopolitan experiences.',
//     images: [
//       'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
//       'https://images.unsplash.com/photo-1485738422979-f5c462d49f74'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in NYC', description: 'Times Square hotel check-in and evening Broadway show.' },
//       { day: 2, title: 'Manhattan Highlights', description: 'Statue of Liberty, Empire State Building, and Central Park tour.' }
//     ],
//     inclusions: ['4-star Times Square hotel', 'Daily breakfast', 'Broadway show ticket', 'Metro card']
//   },
//   11: {
//     id: 11,
//     title: 'Sydney Coastal Escape',
//     destination: 'Sydney, Australia',
//     duration: 8,
//     rating: 4.7,
//     reviews: 167,
//     price: 2100,
//     description: 'Discover Sydney stunning coastline, iconic opera house, and beautiful harbor beaches.',
//     images: [
//       'https://images.unsplash.com/photo-1506973035872-a4erc16b8e8d9',
//       'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Sydney', description: 'Check into harbor-view hotel and Darling Harbour exploration.' },
//       { day: 2, title: 'Sydney Icons', description: 'Sydney Opera House tour and Harbour Bridge climb experience.' }
//     ],
//     inclusions: ['4-star harbor hotel', 'Daily breakfast', 'Opera House tour', 'Blue Mountains day trip']
//   },
//   12: {
//     id: 12,
//     title: 'Istanbul Cultural Heritage',
//     destination: 'Istanbul, Turkey',
//     duration: 7,
//     rating: 4.8,
//     reviews: 189,
//     price: 1250,
//     description: 'Bridge between continents with rich Byzantine and Ottoman history in magnificent Istanbul.',
//     images: [
//       'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200',
//       'https://images.unsplash.com/photo-1559564424-4f9d8b9c4e33'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Istanbul', description: 'Hotel check-in in Sultanahmet and evening Bosphorus cruise.' },
//       { day: 2, title: 'Historical Peninsula', description: 'Hagia Sophia, Blue Mosque, and Topkapi Palace tour.' }
//     ],
//     inclusions: ['4-star old city hotel', 'Daily breakfast', 'Museum passes', 'Bosphorus cruise']
//   },
//   13: {
//     id: 13,
//     title: 'Cape Town Natural Wonders',
//     destination: 'Cape Town, South Africa',
//     duration: 9,
//     rating: 4.9,
//     reviews: 134,
//     price: 1650,
//     description: 'Experience breathtaking natural beauty from Table Mountain to Cape Point in South Africa.',
//     images: [
//       'https://images.unsplash.com/photo-1484318571209-661cf29a69c3',
//       'https://images.unsplash.com/photo-1544649800-6d5c80e2d3c2'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Cape Town', description: 'Check into hotel with Table Mountain views.' },
//       { day: 2, title: 'Table Mountain', description: 'Cable car ride to Table Mountain summit for panoramic views.' }
//     ],
//     inclusions: ['4-star hotel', 'Daily breakfast', 'Table Mountain cable car', 'Wine estate tour']
//   },
//   14: {
//     id: 14,
//     title: 'Rome Historical Journey',
//     destination: 'Rome, Italy',
//     duration: 6,
//     rating: 4.7,
//     reviews: 276,
//     price: 1400,
//     description: 'Walk through ancient history in the Eternal City with Colosseum, Vatican, and Roman ruins.',
//     images: [
//       'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
//       'https://images.unsplash.com/photo-1555992828-ca4dbe41d294'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Rome', description: 'Check into central hotel and evening Trevi Fountain visit.' },
//       { day: 2, title: 'Ancient Rome', description: 'Colosseum, Roman Forum, and Palatine Hill guided tour.' }
//     ],
//     inclusions: ['4-star central hotel', 'Daily breakfast', 'Colosseum tickets', 'Vatican Museum access']
//   },
//   15: {
//     id: 15,
//     title: 'Jeddah Red Sea Retreat',
//     destination: 'Jeddah, Saudi Arabia',
//     duration: 5,
//     rating: 4.6,
//     reviews: 89,
//     price: 1200,
//     description: 'Coastal beauty meets rich history in Jeddah, the bride of the Red Sea with coral architecture.',
//     images: [
//       'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
//       'https://images.unsplash.com/photo-1580060839134-75a5edca2e99'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Jeddah', description: 'Red Sea resort check-in and corniche evening walk.' },
//       { day: 2, title: 'Historic Jeddah', description: 'Al-Balad UNESCO World Heritage site and traditional markets.' }
//     ],
//     inclusions: ['5-star beach resort', 'All meals', 'Historical site tours', 'Red Sea boat trip']
//   },
// };
  

//   constructor(
//   private route: ActivatedRoute,
//   private router: Router  // Add this line
// ) {}

//   ngOnInit() {
//     this.route.params.subscribe(params => {
//       this.tourId = +params['id']; // Convert to number
//       this.tour = this.toursData[this.tourId];
      
//       // If tour not found, show first tour as fallback
//       if (!this.tour) {
//         this.tour = this.toursData[1];
//       }
//     });
//   }

//   bookTour() {
//     // console.log('Booking tour:', this.tourId);
//       this.router.navigate(['/booking', this.tourId]);
//           state: { tour: this.tour }  // Pass current tour data
//   }
// }