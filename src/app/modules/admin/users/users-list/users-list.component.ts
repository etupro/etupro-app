import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../../shared/services/user-profile.service';
import { UserProfile } from '../../../../shared/models/user-profile.model';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-users-list',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  userLists: UserProfile[] = [];

  displayedColumns: string[] = ['id', 'organization_id', 'display_name', 'role'];

  constructor(private userProfileService: UserProfileService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userProfileService.getAll().then(users => this.userLists = users);
  }

  navigateToUser(userProfile: UserProfile) {
    this.router.navigate([userProfile.id], {relativeTo: this.route});
  }
}
