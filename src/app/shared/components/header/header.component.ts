import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatIconButton } from "@angular/material/button";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar,
    MatIcon,
    MatProgressBar,
    MatMenu,
    MatMenuTrigger,
    MatIconButton,
    MatMenuItem,
    NgOptimizedImage,
  ]
})
export class HeaderComponent {

  @Input() loading = false;

  constructor(private router: Router, protected authService: AuthService) {
  }

  async handleLogout() {
    await this.authService.logout();
    await this.router.navigate(['/']);
  }
}
