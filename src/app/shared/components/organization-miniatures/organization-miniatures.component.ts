import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Organization } from '../../models/organiazation.model';
import { StorageService } from '../../services/storage.service';
import { Map } from 'immutable';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-organization-miniatures',
  standalone: true,
  imports: [],
  templateUrl: './organization-miniatures.component.html',
  styleUrl: './organization-miniatures.component.scss'
})
export class OrganizationMiniaturesComponent implements OnChanges {

  @Input() organizations: Organization[] = [];
  @Input() limit = 10;

  @Output() organizationClick = new EventEmitter<number>();

  organizationLogos: Map<number, (SafeResourceUrl | string)> = Map<number, (SafeResourceUrl | string)>();

  constructor(private storageService: StorageService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['organizations']) {
      this.organizationLogos = Map<number, (SafeResourceUrl | string)>();
      if (this.organizations) {
        const organizationWithLogos = this.organizations
          .filter(o => o.picture)
          .slice(0, this.limit);
        this.storageService.getSignedUrls(StorageService.BucketName.ORGANIZATION_IMAGES, organizationWithLogos.map(o => o.picture) as string[]).then(urls => {
          this.organizationLogos = Map<number, (SafeResourceUrl | string)>(organizationWithLogos.map(o => [o.id, urls.get(o.picture as string) as string]));
        });
      }
    }
  }

  handleOrganizationClick(event: MouseEvent, organizationId: number) {
    event.stopPropagation();
    this.organizationClick.emit(organizationId);
  }

  handleKeyDown(event: KeyboardEvent, organizationId: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.organizationClick.emit(organizationId);
    }
  }
}
