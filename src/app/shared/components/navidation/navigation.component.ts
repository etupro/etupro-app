import { Component, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
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
  @ViewChild('drawer') drawer: MatDrawer;

  constructor(private router: Router, protected authService: AuthService) {
  }

  async handleLogout() {
    await this.authService.logout();
    await this.router.navigate(['/']);
    await this.drawer.close();
  }

  async handlePosts() {
    await this.router.navigate(['/', 'posts']);
    await this.drawer.close();
  }

  async handleRegister() {
    await this.router.navigate(['/', 'auth', 'register']);
    await this.drawer.close();
  }

  async handleProfile() {
    await this.router.navigate(['/', 'user', 'profile']);
    await this.drawer.close();
  }
}
