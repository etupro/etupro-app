import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatIcon,
    MatFabButton
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  dashboardLinks = [
    {
      title: 'Utilisateurs',
      icon: 'group',
      link: '/admin/users'
    }
  ];

  constructor(private router: Router) { }

  navigateToDashboardLink(link: string) {
    this.router.navigate([link]);
  }
}
