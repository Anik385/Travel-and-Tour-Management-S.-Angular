
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit {
  region: string = '';
  regionName: string = '';
  countries: any[] = [];

  // Country data for each region
  regionData: any = {
    'asia': {
      name: 'Asia',
      countries: [
        { name: 'Thailand', image: 'assets/destination/thailand.jpg', description: 'Land of smiles and beautiful beaches' },
        { name: 'Japan', image: 'assets/destination/japan.jpg', description: 'Modern cities and ancient traditions' },
        { name: 'Indonesia', image: 'assets/destination/indonesia.jpg', description: 'Tropical paradise with rich culture' },
        { name: 'Malaysia', image: 'assets/destination/malaysia.jpg', description: 'Diverse culture and stunning islands' },
        { name: 'Vietnam', image: 'assets/destination/vietnam.jpg', description: 'Vibrant cities and natural wonders' },
        { name: 'South Korea', image: 'assets/destination/korea.jpg', description: 'K-pop culture and technological wonders' }
      ]
    },
    'europe': {
      name: 'Europe',
      countries: [
        { name: 'France', image: 'assets/france.jpg', description: 'Romantic cities and exquisite cuisine' },
        { name: 'Italy', image: 'assets/italy.jpg', description: 'Historic landmarks and delicious food' },
        { name: 'Spain', image: 'assets/spain.jpg', description: 'Vibrant culture and beautiful coastlines' },
        { name: 'Germany', image: 'assets/germany.jpg', description: 'Rich history and modern innovation' },
        { name: 'United Kingdom', image: 'assets/uk.jpg', description: 'Royal heritage and cosmopolitan cities' },
        { name: 'Greece', image: 'assets/greece.jpg', description: 'Ancient ruins and stunning islands' }
      ]
    },
    'middle-east': {
      name: 'Middle East',
      countries: [
        { name: 'United Arab Emirates', image: 'assets/uae.jpg', description: 'Modern marvels and luxury experiences' },
        { name: 'Saudi Arabia', image: 'assets/saudi.jpg', description: 'Rich heritage and spiritual journey' },
        { name: 'Qatar', image: 'assets/qatar.jpg', description: 'Cultural fusion and modern architecture' },
        { name: 'Oman', image: 'assets/oman.jpg', description: 'Natural beauty and Arabian traditions' },
        { name: 'Jordan', image: 'assets/jordan.jpg', description: 'Ancient history and desert landscapes' },
        { name: 'Egypt', image: 'assets/egypt.jpg', description: 'Pyramids and Nile river adventures' }
      ]
    },
    'americas': {
      name: 'Americas',
      countries: [
        { name: 'United States', image: 'assets/usa.jpg', description: 'Diverse landscapes and iconic cities' },
        { name: 'Canada', image: 'assets/canada.jpg', description: 'Natural wonders and friendly cities' },
        { name: 'Brazil', image: 'assets/brazil.jpg', description: 'Amazon rainforest and vibrant culture' },
        { name: 'Mexico', image: 'assets/mexico.jpg', description: 'Ancient ruins and beautiful beaches' },
        { name: 'Argentina', image: 'assets/argentina.jpg', description: 'Tango and stunning landscapes' },
        { name: 'Peru', image: 'assets/peru.jpg', description: 'Machu Picchu and rich history' }
      ]
    },
    'oceania': {
      name: 'Oceania',
      countries: [
        { name: 'Australia', image: 'assets/australia.jpg', description: 'Outback adventures and coastal wonders' },
        { name: 'New Zealand', image: 'assets/newzealand.jpg', description: 'Dramatic landscapes and Maori culture' },
        { name: 'Fiji', image: 'assets/fiji.jpg', description: 'Tropical paradise and crystal waters' },
        { name: 'Papua New Guinea', image: 'assets/papua.jpg', description: 'Unique culture and biodiversity' },
        { name: 'Samoa', image: 'assets/samoa.jpg', description: 'Pristine beaches and traditional villages' },
        { name: 'Vanuatu', image: 'assets/vanuatu.jpg', description: 'Volcanoes and marine adventures' }
      ]
    },
    'africa': {
      name: 'Africa',
      countries: [
        { name: 'South Africa', image: 'assets/southafrica.jpg', description: 'Safari adventures and diverse landscapes' },
        { name: 'Kenya', image: 'assets/kenya.jpg', description: 'Wildlife safaris and Maasai culture' },
        { name: 'Morocco', image: 'assets/morocco.jpg', description: 'Desert tours and ancient medinas' },
        { name: 'Tanzania', image: 'assets/tanzania.jpg', description: 'Serengeti and Mount Kilimanjaro' },
        { name: 'Egypt', image: 'assets/egypt.jpg', description: 'Pyramids and Nile cruises' },
        { name: 'Mauritius', image: 'assets/mauritius.jpg', description: 'Island paradise and luxury resorts' }
      ]
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.region = params['region'];
      this.loadRegionData();
    });
  }

  loadRegionData() {
    const data = this.regionData[this.region];
    if (data) {
      this.regionName = data.name;
      this.countries = data.countries;
    }
  }

  exploreCountry(country: any) {
    // Navigate to tours filtered by country
    console.log('Explore country:', country.name);
  }
}