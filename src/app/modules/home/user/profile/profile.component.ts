import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../../shared/services/auth.service";
import { UserProfile } from "../../../../shared/models/user-profile.model";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  userProfile: UserProfile | null = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.userProfile$.subscribe(userProfile => {
      this.userProfile = userProfile;
    })
  }

}
