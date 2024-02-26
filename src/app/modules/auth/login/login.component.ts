import {Component, OnInit, Optional} from '@angular/core';
import {Auth, signInAnonymously} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  redirect = ['/home'];

  constructor(@Optional() private auth: Auth, private router: Router) {
  }

  async loginAnonymously() {
    await signInAnonymously(this.auth);
    await this.router.navigate(this.redirect);
  }
}
