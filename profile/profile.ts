import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class Profile implements OnInit {
  employee: any = {
    name: '',
    phone: '',
    email: '',
    facebook: '',
    instgram: '',
    linkedin: ''
  };

  constructor(private http: HttpClient , private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get('https://localhost:7180/Employees/me', { headers }).subscribe({
        next: (res: any) => {
          this.employee = res;
        },

      });
    }
  }

  onSubmit() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.put('https://localhost:7180/Employees/me', this.employee, { headers }).subscribe({
        next: () => {
          this.router.navigate([`/employee/${this.employee.id}`]);

        },

      });
    }
  }
}
