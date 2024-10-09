import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar,
    MatIcon,
    MatIconButton,
    NgOptimizedImage,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
  ]
})
export class NavigationComponent {

  constructor(private router: Router,
              protected authService: AuthService) {
  }

  async handleLogout() {
    await this.authService.logout();
    await this.router.navigate(['/']);
  }

  async handlePosts() {
    await this.router.navigate(['/', 'posts']);
  }

  async handleRegister() {
    await this.router.navigate(['/', 'auth', 'register']);
  }

  async handleProfile() {
    await this.router.navigate(['/', 'user', this.authService.userProfileId]);
  }
}
