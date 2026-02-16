import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import all your components
import { HeaderComponent } from './components/shared/header/header.component';
import { HomeComponent } from './components/tours/home/home.component';
import { TourListComponent } from './components/tours/tour-list/tour-list.component';
import { TourCardComponent } from './components/tours/tour-card/tour-card.component';
import { TourDetailsComponent } from './components/tours/tour-details/tour-details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BookingComponent } from './components/booking/booking/booking.component';
import { CheckoutComponent } from './components/booking/checkout/checkout.component';
import { BookingConfirmationComponent } from './components/booking/booking-confirmation/booking-confirmation.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { MyBookingsComponent } from './components/user/my-bookings/my-bookings.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminToursComponent } from './components/admin/admin-tours/admin-tours.component';
import { AdminTourFormComponent } from './components/admin/admin-tour-form/admin-tour-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationSuccessComponent } from './components/auth/registration-success/registration-success.component';
import { FlightSearchComponent } from './components/flights/flight-search/flight-search.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { DestinationsComponent } from './components/destinations/destinations/destinations.component';
import { AdminFlightsComponent } from './components/admin/admin-flights/admin-flights.component';
import { AdminFlightFormComponent } from './components/admin/admin-flight-form/admin-flight-form.component';
import { FlightBookingComponent } from './components/flights/flight-booking/flight-booking.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { CartComponent } from './components/booking/cart/cart.component';
import { AdminBookingsComponent } from './components/admin/admin-bookings/admin-bookings.component';
import { AdminGuard } from './guards/admin.guard';
import { PassengerDetailsComponent } from './components/booking/passenger-details/passenger-details.component';
import { PaymentComponent } from './components/booking/payment/payment.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TourListComponent,
    TourCardComponent,
    TourDetailsComponent,
    LoginComponent,
    RegisterComponent,
    BookingComponent,
    CheckoutComponent,
    BookingConfirmationComponent,
    UserDashboardComponent,
    MyBookingsComponent,
    AdminDashboardComponent,
    AdminToursComponent,
    AdminTourFormComponent,
    RegistrationSuccessComponent,
    FlightSearchComponent,
    AboutUsComponent,
    ContactComponent,
    DestinationsComponent,
    AdminFlightsComponent,
    AdminFlightFormComponent,
    AdminFlightsComponent,
  AdminFlightFormComponent,
  FlightBookingComponent,
  ProfileComponent,
  CartComponent,
  AdminBookingsComponent,
  PassengerDetailsComponent,
  PaymentComponent
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, 
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
