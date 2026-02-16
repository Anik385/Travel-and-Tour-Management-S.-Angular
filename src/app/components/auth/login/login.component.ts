import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Reset form validation
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'Please enter username and password';
      this.isLoading = false;
      return;
    }
    
    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        
        // Check if login was successful
        if (response.success === false || !this.authService.isLoggedIn()) {
          this.errorMessage = response.message || 'Login failed';
          return;
        }
        
        console.log('✅ Login successful');
        
        // Navigate based on role
        if (this.authService.isAdmin()) {
          console.log('👑 Admin user detected');
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
        
        // Force page reload to update header
        setTimeout(() => window.location.reload(), 100);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login failed:', error);
        
        if (error.status === 401 || error.status === 403) {
          this.errorMessage = 'Invalid username or password';
        } else if (error.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please check if backend is running.';
        } else {
          this.errorMessage = error.error?.message || error.message || 'Login failed';
        }
      }
    });
  }
  
  // Quick login for testing
  quickLogin(username: string, password: string) {
    this.credentials.username = username;
    this.credentials.password = password;
    this.onLogin();
  }
}

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../../services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   credentials = { username: '', password: '' };
//   isLoading = false;
//   errorMessage = '';

//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   onLogin() {
//   this.authService.login(this.credentials).subscribe({
//     next: (token: string) => { // ✅ Accept string directly
//       localStorage.setItem('token', token);
//       localStorage.setItem('role', 'ROLE_USER'); // ADD THIS LINE
//       this.router.navigate(['/dashboard']);
//     },
//     error: (error) => {
//       console.error('Login failed:', error);
//       this.errorMessage = error.error?.message || 'Login failed. Check credentials.';
//     }
//   });
// }
// }