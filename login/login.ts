import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class Login {
  email = '';
  password = '';
  wrongPassword = false; // ✅ Add this

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const body = {
      email: this.email,
      password: this.password
    };

    this.http.post('https://localhost:7180/Employees/login', body).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/profile']);
        } else {
          alert('Token not received. Please contact support.');
        }
      },
      error: (err) => {
        this.wrongPassword = true; // ✅ Trigger wiggle on error
        setTimeout(() => this.wrongPassword = false, 400); // ✅ Reset after animation

      }
    });
  }
}
