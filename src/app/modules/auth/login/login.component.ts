import {Component} from '@angular/core';
import {Auth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  redirect = ['/posts'];

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, {
    updateOn: "submit"
  })

  hide = true;

  constructor(private auth: Auth, private router: Router) {
  }

  async login() {
    if (!this.loginForm.valid) {
      return;
    }

    const userCreds = await signInWithEmailAndPassword(this.auth, this.loginForm.value.email!, this.loginForm.value.password!)
    localStorage.setItem('sessionId', userCreds.user.refreshToken);
    this.router.navigate(this.redirect);
  }
}
