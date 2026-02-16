import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']

})
export class RegisterComponent {
  user = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  };
  
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister() {
    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Registration successful! You can now login.';
        
        // Auto login after registration
        setTimeout(() => {
          this.authService.login({
            username: this.user.username,
            password: this.user.password
          }).subscribe({
            next: (loginResponse) => {
              this.router.navigate(['/']);
            },
            error: (loginError) => {
              this.router.navigate(['/login']);
            }
          });
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Registration failed';
      }
    });
  }
}


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent {
//   showSuccess: boolean = false;
  
//   // Form Properties
//   firstName: string = '';
//   lastName: string = '';
//   email: string = '';
//   phone: string = '';
//   password: string = '';
//   confirmPassword: string = '';
//   agreeTerms: boolean = false;

//   // Password visibility
//   showPassword: boolean = false;
//   showConfirmPassword: boolean = false;

//   constructor(private router: Router) {}

//   createAccount() {
//     // Validate form before proceeding
//     if (!this.isFormValid()) {
//       alert('Please fill all required fields marked with *');
//       return;
//     }
    
//     if (!this.isEmailValid()) {
//       alert('Please enter a valid email address');
//       return;
//     }

//     if (!this.isPasswordValid()) {
//       alert('Password must be at least 6 characters long');
//       return;
//     }

//     if (this.password !== this.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     if (!this.agreeTerms) {
//       alert('Please agree to the Terms & Conditions');
//       return;
//     }

//     // Simulate API call - only show success if everything is valid
//     console.log('Creating account with:', {
//       firstName: this.firstName,
//       lastName: this.lastName,
//       email: this.email,
//       phone: this.phone
//     });
    
//     setTimeout(() => {
//       this.showSuccess = true;
//     }, 1000);
//   }

//   private isFormValid(): boolean {
//     return !!this.firstName?.trim() && 
//            !!this.lastName?.trim() && 
//            !!this.email?.trim() && 
//            !!this.password && 
//            !!this.confirmPassword;
//   }

//   private isEmailValid(): boolean {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(this.email);
//   }

//   private isPasswordValid(): boolean {
//     return this.password.length >= 6;
//   }

//   navigateToDashboard() {
//     this.router.navigate(['/dashboard']);
//   }

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }

//   toggleConfirmPasswordVisibility() {
//     this.showConfirmPassword = !this.showConfirmPassword;
//   }

//   getPasswordFieldType(): string {
//     return this.showPassword ? 'text' : 'password';
//   }

//   getConfirmPasswordFieldType(): string {
//     return this.showConfirmPassword ? 'text' : 'password';
//   }
// }
