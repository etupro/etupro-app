import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { MatToolbar } from "@angular/material/toolbar";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sub-header',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatToolbar
  ],
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss'
})
export class SubHeaderComponent {

  constructor(private router: Router) {
  }

  backToPosts() {
    this.router.navigate(['/', 'posts']);
  }
}
