import {Component, OnInit, Optional} from '@angular/core';
import {Auth, signInAnonymously} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  redirect = ['/posts'];

  constructor(@Optional() private auth: Auth, private router: Router) {
  }

  async loginAnonymously() {
    signInAnonymously(this.auth)
      .then(() => this.router.navigate(this.redirect));
  }
}
