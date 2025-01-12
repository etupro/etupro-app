import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { UserInformationsFormComponent } from '../../../../shared/components/user-informations-form/user-informations-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserProfileService } from '../../../../shared/services/user-profile.service';
import { UserProfile } from '../../../../shared/models/user-profile.model';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    UserInformationsFormComponent
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {

  watcher = new Subscription();

  userId: number | null = null;
  userProfile: UserProfile | null = null;

  constructor(private userProfileService: UserProfileService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.watcher.add(this.route.params.subscribe(async params => {
      this.userId = params['id'] === 'new' ? null : parseInt(params['id']);
      if (this.userId) {
        this.userProfile = await this.userProfileService.getById(this.userId);
        if (this.userProfile) {
          this.userProfile = await this.userProfileService.getByUserId(this.userProfile.user_id);
        }
      }
    }));
  }

  handleSaved() {
    this.router.navigate(['/', 'home', 'users', this.userId]);
  }
}
