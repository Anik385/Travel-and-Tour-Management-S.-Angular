

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss']
// })
// export class HeaderComponent {
//   isLoggedIn: boolean = false; // Will connect to auth service later
//   isAdmin: boolean = false; // Will connect to auth service later

//   // Temporary function for demo
//   toggleLogin() {
//     this.isLoggedIn = !this.isLoggedIn;
//     this.isAdmin = this.isLoggedIn; // For demo purposes
//   }
// } 
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss']
// })
// export class HeaderComponent {
//   isLoggedIn: boolean = false;
//   isAdmin: boolean = false;
//   isMobileMenuOpen: boolean = false;
//     showUserDropdown: boolean = false;
//     constructor(private router: Router) {} // Add constructor

//     toggleUserDropdown() {
//     this.showUserDropdown = !this.showUserDropdown;
//   }

//   toggleMobileMenu() {
//     this.isMobileMenuOpen = !this.isMobileMenuOpen;
//   }
//   logout() {
//     this.isLoggedIn = false;
//     this.isAdmin = false;
//     this.showUserDropdown = false;
//     // Clear any stored user data
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     // Redirect to home
//     this.router.navigate(['/']);
//   }

//   // For demo - remove in real implementation
//   toggleLogin() {
//     this.isLoggedIn = !this.isLoggedIn;
//     this.isAdmin = this.isLoggedIn;
//   }
//   ngOnInit() {
//   this.isLoggedIn = !!localStorage.getItem('user');
// }
// } 

import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  showUserDropdown: boolean = false;
  userName: string = 'User';
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    this.checkAuthStatus();
    
    // Listen for auth state changes
    this.router.events.subscribe(() => {
      setTimeout(() => this.checkAuthStatus(), 100);
    });
  }
  
  checkAuthStatus() {
    const token = localStorage.getItem('token');
    console.log('🔄 Checking auth status...');
    console.log('🔑 Token present:', !!token);
    
    this.isLoggedIn = !!token;
    
    if (token) {
      try {
        // Decode JWT token
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        
        console.log('📝 Decoded payload:', payload);
        console.log('🎭 Raw roles:', payload.roles);
        
        // Check for admin role
        if (Array.isArray(payload.roles)) {
          this.isAdmin = payload.roles.includes('ROLE_ADMIN');
        } else if (typeof payload.roles === 'string') {
          this.isAdmin = payload.roles === 'ROLE_ADMIN';
        } else {
          this.isAdmin = false;
        }
        
        this.userName = payload.sub || payload.username || 'User';
        
        console.log('👑 isAdmin:', this.isAdmin);
        console.log('👤 userName:', this.userName);
        
        // Store user info for debugging
        localStorage.setItem('debug_user', JSON.stringify({
          username: this.userName,
          isAdmin: this.isAdmin,
          roles: payload.roles
        }));
        
      } catch(e) {
        console.error('❌ Token decode error:', e);
        this.clearAuth();
      }
    } else {
      this.isAdmin = false;
      this.userName = 'User';
    }
  }
  
  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }
  
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu') && !target.closest('.user-dropdown')) {
      this.showUserDropdown = false;
    }
  }
  
  logout() {
    console.log('🚪 Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('debug_user');
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.showUserDropdown = false;
    this.userName = 'User';
    this.router.navigate(['/']);
    window.location.reload(); // Force refresh to update header
  }
  
  private clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('debug_user');
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.userName = 'User';
  }
  debugToken() {
  const token = localStorage.getItem('token');
  console.log('🔍 DEBUG TOKEN:', token);
  
  if (token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      console.log('📝 PAYLOAD:', payload);
      alert(`User: ${payload.sub}\nRoles: ${JSON.stringify(payload.roles)}\nAdmin: ${this.isAdmin}`);
    } catch(e) {
      console.error('Decode error:', e);
    }
  }
}
}