import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserProfile } from '../../../../shared/models/user-profile.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { UserRoleSelectInputComponent } from '../../../../shared/components/select-input/user-role-select-input/user-role-select-input.component';
import { AdminService } from '../../../../shared/services/admin.service';
import { Role } from '../../../../shared/models/enum/role.enum';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatCardContent,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    UserRoleSelectInputComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  userForm = new FormGroup({
    displayName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    role: new FormControl<Role>('USER', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  });

  userId: string;
  userProfile: UserProfile | null = null;
  readonly = true;

  watcher = new Subscription();

  constructor(private route: ActivatedRoute,
              private adminService: AdminService,
              private router: Router) {
  }

  ngOnInit() {
    this.watcher.add(this.route.params.subscribe(params => {
      this.handleRouteParamChange(params);
    }));
  }

  handleRouteParamChange = async (params: Params) => {
    this.userId = params['id'];
    if (this.userId && this.userId !== 'new' && this.userId !== '') {
      this.userProfile = await this.adminService.getUserProfileByIdWithAuthUser(parseInt(this.userId));
      this.userForm.setValue({
        displayName: this.userProfile?.display_name ?? '',
        role: this.userProfile?.role ?? 'USER',
        email: this.userProfile?.user?.email ?? '',
      }, {emitEvent: true});
      this.readonly = true;
    } else {
      this.userForm.setValue({
        displayName: '',
        role: 'USER',
        email: '',
      });
      this.readonly = false;
    }
  };

  async saveForm(): Promise<void> {
    if (this.userId && this.userId !== 'new' && this.userId !== '') {
      await this.updateUser();
    } else {
      await this.createUser();
    }
  }

  async updateUser(): Promise<void> {
    if (!this.userProfile?.user) {
      return;
    }

    const displayName = this.userForm.value.displayName;
    const role = this.userForm.value.role;

    if (!displayName || !role) {
      return;
    }

    const userProfileUpdate: UserProfile = {
      ...this.userProfile,
      display_name: displayName,
      role,
      user: {
        ...this.userProfile.user,
        email: this.userForm.value.email
      }
    };

    this.userProfile = await this.adminService.updateUserProfileByIdWithAuthUser(parseInt(this.userId), userProfileUpdate);
    this.userForm.setValue({
      displayName: this.userProfile?.display_name ?? '',
      role: this.userProfile?.role ?? 'USER',
      email: this.userProfile?.user?.email ?? '',
    });
    this.readonly = true;
  }

  async createUser(): Promise<void> {
    const displayName = this.userForm.value.displayName;
    const role = this.userForm.value.role;
    const email = this.userForm.value.email;

    if (!displayName || !role || !email) {
      return;
    }

    const userProfileInsert: UserProfile.Insert = {
      ...this.userProfile,
      display_name: displayName,
      role,
      user_id: '',
      user: {
        email: this.userForm.value.email
      }
    };

    this.userProfile = await this.adminService.insertUserProfileByIdWithAuthUser(userProfileInsert);
    this.router.navigate(['/admin/users/' + this.userProfile?.id]);
  }
}
