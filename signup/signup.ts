import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.html',
  imports: [CommonModule, FormsModule,RouterModule]
})
export class Signup {

  name = '';
  email = '';
  password = '';


  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    // Since your backend expects 'PasswordHash', we rename it here.
    const body = {
      email: this.email,
      passwordHash: this.password,
      name: this.name,
      facebook: '',
      instgram: '',
      linkedin: '',
      phone: ''
    };

    this.http.post('https://localhost:7180/Employees', body).subscribe({
      next: (res: any) => {
        alert('Signup successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Signup failed: ' + err.error?.message || err.statusText);
      }
    });
  }
}
