import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() loading = false;

  constructor(private router: Router) {
  }

  home() {
    this.router.navigate(['/']);
  }

  createPost() {
    this.router.navigate(['/', 'posts', 'create']);
  }

  logout() {
    this.router.navigate(['/', 'logout']);
  }
}
