import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface LoginResponse {
  success?: boolean;
  token?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // ✅ Login with credentials object
  login(credentials: {username: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Login response:', response);
        
        let token: string;
        
        // Handle different response formats
        if (typeof response === 'string') {
          token = response;
        } else if (response?.token) {
          token = response.token;
        } else {
          console.error('Invalid login response:', response);
          return;
        }
        
        // Store token
        localStorage.setItem('token', token);
        console.log('Token stored:', token.substring(0, 50) + '...');
        
        // Decode token to extract user info
        this.decodeAndStoreUserInfo(token);
      })
    );
  }

  // ✅ Register with proper typing
  register(userData: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // Check if token is expired
    try {
      const payload = this.decodeToken(token);
      const isExpired = Date.now() >= payload.exp * 1000;
      return !isExpired;
    } catch {
      return false;
    }
  }

  isAdmin(): boolean {
    const roles = this.getUserRoles();
    return roles.includes('ROLE_ADMIN');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private decodeAndStoreUserInfo(token: string): void {
    try {
      const payload = this.decodeToken(token);
      
      // Store roles
      if (payload.roles) {
        localStorage.setItem('roles', JSON.stringify(payload.roles));
      }
      
      // Store user info
      const userInfo = {
        username: payload.sub,
        email: payload.email,
        userId: payload.userId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        roles: payload.roles || []
      };
      
      localStorage.setItem('user', JSON.stringify(userInfo));
      console.log('User info stored:', userInfo);
      
    } catch (e) {
      console.error('Error decoding token:', e);
    }
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (e) {
      console.error('Token decode error:', e);
      return {};
    }
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';
// import { Router } from '@angular/router';
// import { environment } from '../../environments/environment';

// interface LoginResponse {
//   token: string;
//   username: string;
//   role: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   isAdmin(): boolean {
//   const role = localStorage.getItem('role');
//   return role === 'ROLE_ADMIN' || role === 'admin';
// }
//   private apiUrl = `${environment.apiUrl}/auth`;

//   constructor(
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   login(credentials: any): Observable<any> {
//   return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
//     tap((response: any) => {
//       // ✅ FIX: Check if response is string or object
//       let token: string;
      
//       if (typeof response === 'string') {
//         token = response; // Direct token string
//       } else if (response?.token) {
//         token = response.token; // Object with token property
//       } else {
//         console.error('Invalid login response:', response);
//         return;
//       }
      
//       // Store token
//       localStorage.setItem('token', token);
//       console.log('Token stored (first 50 chars):', token.substring(0, 50) + '...');
//     })
//   );
// }


// //   login(credentials: any): Observable<any> {
// //   return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
// //     tap((response: any) => {
// //       // ✅ FIX: Get token from response object
// //       const token = response.token || response; // Handle both cases
// //       localStorage.setItem('token', token);
// //       console.log('Token stored:', token.substring(0, 20) + '...');
// //     })
// //   );
// // }
  
// //   login(credentials: any): Observable<any> {
// //   return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
// //     tap((response: any) => {
// //       localStorage.setItem('token', response); // ✅ Store token
// //       localStorage.setItem('user', credentials.username);
// //     })
// //   );
// // }
// // login(credentials: any): Observable<any> {
// //   return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
// //     tap((response: any) => {
// //       // ✅ FIX: Extract token from response object
// //       const token = response.token; // Get ONLY the token property
// //       localStorage.setItem('token', token);
// //       console.log('Token stored:', token?.substring(0, 20) + '...');
// //     })
// //   );
// // }


//   register(userData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, userData);
//   }

//   logout(): void {
//     localStorage.clear();
//     this.router.navigate(['/login']);
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   getUserRole(): string | null {
//     return localStorage.getItem('role');
//   }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:8080/api/auth';

//   constructor(private http: HttpClient) {}

//   login(credentials: {username: string, password: string}): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
//       tap((response: any) => {
//         // Store JWT token (adjust based on your response format)
//         if (response.token) {
//           localStorage.setItem('token', response.token);
//         }
//       })
//     );
//   }

//   register(userData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, userData);
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }
// }