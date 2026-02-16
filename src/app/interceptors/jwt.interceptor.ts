// jwt.interceptor.ts
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
  const publicEndpoints = [
    '/api/auth/',           // Auth endpoints
    '/api/tours',           // GET tours (public)
    '/api/flights/search',  // Flight search
  ];
  
  const isPublic = publicEndpoints.some(endpoint => 
    req.url.includes(endpoint)
  );
  
  // Always add token for /api/users/profile
  const isUserProfile = req.url.includes('/api/users/profile');
  
  const token = localStorage.getItem('token');
  
  // If token exists and endpoint is not public
  if (token && (!isPublic || isUserProfile)) {
    // Check if token is an object
    let actualToken = token;
    if (token.startsWith('{')) {
      try {
        const tokenObj = JSON.parse(token);
        actualToken = tokenObj.token || token;
      } catch (e) {
        console.error('Invalid token format:', token);
      }
    }
    
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${actualToken}` }
    });
  }
  
  return next.handle(req);
}
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     // Don't send token for public endpoints
//     const publicEndpoints = [
//       '/api/tours',           // GET all tours (public)
//       '/api/flights/search',  // Flight search (public)
//       '/api/auth/'           // Auth endpoints
//     ];
//     console.log('Booking request URL:', req.url);
// console.log('Token exists:', !!localStorage.getItem('token'));

//     const isPublic = publicEndpoints.some(endpoint => req.url.includes(endpoint));
    
//     // For tour details (e.g., /api/tours/1), we NEED token
//     const token = localStorage.getItem('token');
    
//     if (token && !isPublic) {
//       req = req.clone({
//         setHeaders: { Authorization: `Bearer ${token}` }
//       });
//     }
    
//     return next.handle(req);
//   }
}


// import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const token = localStorage.getItem('token');
//     if (token) {
//       req = req.clone({
//         setHeaders: { Authorization: `Bearer ${token}` }
//       });
//     }
//     return next.handle(req);
//   }
// }
