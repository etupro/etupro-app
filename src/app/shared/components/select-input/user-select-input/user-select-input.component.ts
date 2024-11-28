import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectElement } from '../../../models/select-element.model';
import { UserProfileService } from '../../../services/user-profile.service';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { SelectInputComponent } from '../select-input.component';

@Component({
  selector: 'app-user-select-input',
  standalone: true,
  imports: [
    SelectInputComponent
  ],
  templateUrl: './user-select-input.component.html',
  styleUrl: './user-select-input.component.scss'
})
export class UserSelectInputComponent implements OnInit, OnDestroy {

  @Input() valueControl = new FormControl<number | null>(null);
  @Input() label = 'Utilisateurs';
  @Input() required = false;
  @Input() readonly = false;

  allUsers: SelectElement<number | null>[] = [];
  isSuperAdmin = false;

  watcher = new Subscription();

  constructor(private profileService: UserProfileService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.watcher.add(this.authService.userProfile$.subscribe(userProfile => {
      this.isSuperAdmin = userProfile?.role === 'SUPER_ADMIN';

      if (this.isSuperAdmin) {
        this.profileService.getAll().then(users => {
          this.allUsers = users.map(d => {
            return {
              value: d.id,
              label: d.display_name
            };
          }) ?? [];
          if (!this.required) {
            this.allUsers = [{value: null, label: ''}, ...this.allUsers];
          }
        });
      } else {
        this.allUsers = [ { value: userProfile?.id ?? 0, label: userProfile?.display_name ?? 'Anonyme' } ];
      }
    }));
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }
}
