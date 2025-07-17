import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return of(false);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // Call backend to validate the token
    return this.http.get('https://localhost:7180/Employees/me', { headers }).pipe(
      map(() => true), // If successful, allow navigation
      catchError(() => {
        // If invalid or expired token
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
