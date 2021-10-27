import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  Logout() {
    this.service.logout();
    this.router.navigate(['/login']);

    }
}

