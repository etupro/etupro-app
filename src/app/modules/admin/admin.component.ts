import { Component } from '@angular/core';
import {NavigationComponent} from '../../shared/components/navigation/navigation.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
    imports: [
        NavigationComponent,
        RouterOutlet
    ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
