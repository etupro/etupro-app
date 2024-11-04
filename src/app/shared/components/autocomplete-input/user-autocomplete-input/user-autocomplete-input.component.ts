import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectElement } from '../../../models/select-element.model';
import { AutocompleteInputComponent } from '../autocomplete-input.component';
import { UserProfileService } from '../../../services/user-profile.service';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-autocomplete-input',
  standalone: true,
  imports: [
    AutocompleteInputComponent
  ],
  templateUrl: './user-autocomplete-input.component.html',
  styleUrl: './user-autocomplete-input.component.scss'
})
export class UserAutocompleteInputComponent  implements OnInit, OnDestroy {

  @Input() valueControl = new FormControl<number | null>(null);
  @Input() label = 'Utilisateurs';
  @Input() required = false;
  @Input() readonly = false;

  allUsers: SelectElement<number>[] = [];
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
