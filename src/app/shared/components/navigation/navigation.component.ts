import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { UserProfile } from '../../models/user-profile.model';

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
export class NavigationComponent implements OnInit, OnDestroy {

  isHandset = false;

  currentUser: UserProfile | null = null;

  watcher = new Subscription();

  constructor(private router: Router,
              protected authService: AuthService,
              private responsive: BreakpointObserver) {
  }

  ngOnInit() {
    this.watcher.add(this.responsive.observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe(result => this.isHandset = result.matches));

    this.watcher.add(this.authService.userProfile$.subscribe(userProfile => this.currentUser = userProfile));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  async handleLogout() {
    await this.authService.logout();
    await this.router.navigate(['/']);
  }

  async handleAdmin() {
    await this.router.navigate(['/', 'admin']);
  }

  async handlePosts() {
    await this.router.navigate(['/', 'posts']);
  }

  async handleRegister() {
    await this.router.navigate(['/', 'auth', 'register']);
  }

  async handleProfile() {
    await this.router.navigate(['/', 'user', this.currentUser?.id]);
  }
}
