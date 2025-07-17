import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser'; // ✅ Import Title service

@Component({
  standalone: true,
  selector: 'app-employees',
  imports: [CommonModule],
  templateUrl: './employees.html',
  styleUrls: ['./employees.css']
})
export class Employees implements OnInit {
  employee: any;
  isDarkMode = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.http.get(`https://localhost:7180/Employees/${id}`).subscribe(data => {
      this.employee = data;

      // ✅ Set the page title based on employee name
      if (this.employee?.name) {
        this.titleService.setTitle(this.employee.name);
      }
    });

    // Optional: load dark mode state from localStorage
    const darkPref = localStorage.getItem('darkMode');
    if (darkPref === 'true') {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    }
  }

  onImageError(event: Event) {
    const fallbackUrl = 'assets/pp.png';
    (event.target as HTMLImageElement).src = fallbackUrl;
  }
  Login(): void{

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000); // 2000 ms = 2 seconds
  }

  toggleDarkMode() {
    const htmlEl = document.documentElement;
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }

    // Optional: save user preference
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  downloadVCard(employee: any) {
    const fullName = employee.name || 'Unknown';
    const phone = employee.phone || '+0000000000';
    const email = employee.email || 'noemail@example.com';

    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${fullName}
TEL:${phone}
EMAIL:${email}
END:VCARD
    `.trim();

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fullName.replace(/\s+/g, '_')}.vcf`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
