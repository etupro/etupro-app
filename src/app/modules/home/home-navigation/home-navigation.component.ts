import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
  selector: 'app-home-navigation',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './home-navigation.component.html',
  styleUrl: './home-navigation.component.scss'
})
export class HomeNavigationComponent {

}
