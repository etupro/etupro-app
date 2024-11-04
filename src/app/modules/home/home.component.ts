import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavigationComponent } from "../../shared/components/navigation/navigation.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
