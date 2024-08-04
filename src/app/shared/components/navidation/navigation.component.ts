import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatDrawer, MatDrawerContainer } from "@angular/material/sidenav";
import { MatList, MatListItem } from "@angular/material/list";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar,
    MatIcon,
    MatProgressBar,
    MatIconButton,
    NgOptimizedImage,
    MatButton,
    MatDrawerContainer,
    MatDrawer,
    MatList,
    MatListItem,
  ]
})
export class NavigationComponent {

  @Input() loading = false;

  constructor(private router: Router, protected authService: AuthService) {
  }

  async handleLogout() {
    await this.authService.logout();
    await this.router.navigate(['/']);
  }

  async handleRegister() {
    await this.router.navigate(['/auth/register']);
  }

  async handleProfile() {
    await this.router.navigate(['/user/profile']);
  }
}
