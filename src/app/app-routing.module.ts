// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/tours/home/home.component';
import { TourListComponent } from './components/tours/tour-list/tour-list.component';
import { TourDetailsComponent } from './components/tours/tour-details/tour-details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BookingComponent } from './components/booking/booking/booking.component';
import { BookingConfirmationComponent } from './components/booking/booking-confirmation/booking-confirmation.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { MyBookingsComponent } from './components/user/my-bookings/my-bookings.component';
import { AdminTourFormComponent } from './components/admin/admin-tour-form/admin-tour-form.component';
import { RegistrationSuccessComponent } from './components/auth/registration-success/registration-success.component';
import { FlightSearchComponent } from './components/flights/flight-search/flight-search.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { DestinationsComponent } from './components/destinations/destinations/destinations.component';
import { CheckoutComponent } from './components/booking/checkout/checkout.component';
import { AdminFlightsComponent } from './components/admin/admin-flights/admin-flights.component';
import { AdminFlightFormComponent } from './components/admin/admin-flight-form/admin-flight-form.component';
import { FlightBookingComponent } from './components/flights/flight-booking/flight-booking.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { CartComponent } from './components/booking/cart/cart.component';
import { AdminBookingsComponent } from './components/admin/admin-bookings/admin-bookings.component';
import { AdminGuard } from './guards/admin.guard';
import { PassengerDetailsComponent } from './components/booking/passenger-details/passenger-details.component';
import { PaymentComponent } from './components/booking/payment/payment.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminToursComponent } from './components/admin/admin-tours/admin-tours.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tours', component: TourListComponent },
  { path: 'tours/:id', component: TourDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'booking/:tourId', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'checkout/:tourId', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'booking-confirmation', component: BookingConfirmationComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'my-bookings', component: MyBookingsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  
  // Admin routes
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'admin/tours', component: AdminToursComponent, canActivate: [AdminGuard] },
  { path: 'admin/tours/new', component: AdminTourFormComponent, canActivate: [AdminGuard] },
  { path: 'admin/tours/edit/:id', component: AdminTourFormComponent, canActivate: [AdminGuard] },
  { path: 'admin/flights', component: AdminFlightsComponent, canActivate: [AdminGuard] },
  { path: 'admin/flights/new', component: AdminFlightFormComponent, canActivate: [AdminGuard] },
  { path: 'admin/flights/edit/:id', component: AdminFlightFormComponent, canActivate: [AdminGuard] },
  { path: 'admin/bookings', component: AdminBookingsComponent, canActivate: [AdminGuard] },
  
  // Public routes
  { path: 'registration-success', component: RegistrationSuccessComponent },
  { path: 'flights/search', component: FlightSearchComponent },
  { path: 'flights', component: FlightSearchComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'destinations/:region', component: DestinationsComponent },
  { path: 'cart', component: CartComponent },
  
  // Auth required routes
  { path: 'flights/booking', component: FlightBookingComponent, canActivate: [AuthGuard] },
  { path: 'flights/passenger-details', component: PassengerDetailsComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  
  { path: '**', redirectTo: '' }
];

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'tours', component: TourListComponent },
//   { path: 'tours/:id', component: TourDetailsComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'booking/:tourId', component: BookingComponent, canActivate: [AuthGuard] },
//   // { path: 'checkout', component: CheckoutComponent },
//   { path: 'checkout/:tourId', component: CheckoutComponent },
//   { path: 'booking-confirmation', component: BookingConfirmationComponent },
//   { path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
//   { path: 'my-bookings', component: MyBookingsComponent },
//   // { path: 'admin', component: AdminDashboardComponent }, 
//   { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard] },
//   // { path: 'admin/tours', component: AdminToursComponent },
//   { path: 'admin/tours', component: AdminToursComponent, canActivate: [AuthGuard, AdminGuard] },
//   { path: 'admin/tours/new', component: AdminTourFormComponent },
//   { path: 'admin/tours/edit/:id', component: AdminTourFormComponent },
//   { path: 'registration-success', component: RegistrationSuccessComponent },
//   { path: 'flights/search', component: FlightSearchComponent },
//   { path: 'flights', component: FlightSearchComponent },
//   { path: 'about', component: AboutUsComponent },
//   { path: 'contact', component: ContactComponent },
//   { path: 'destinations/:region', component: DestinationsComponent },
//   { path: 'admin/flights', component: AdminFlightsComponent },
// { path: 'admin/flights/new', component: AdminFlightFormComponent },
// { path: 'admin/flights/edit/:id', component: AdminFlightFormComponent },
// { path: 'flights/booking', component: FlightBookingComponent },
//   { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
// { path: 'admin/bookings', component: AdminBookingsComponent, canActivate: [AdminGuard] },
//   { path: 'cart', component: CartComponent },
// { path: 'flights/passenger-details', component: PassengerDetailsComponent },
// { path: 'payment', component: PaymentComponent },
//   { path: '**', redirectTo: '' }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
