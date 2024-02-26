import {Component, OnInit, Optional} from "@angular/core";
import {Auth, signOut} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(@Optional() private auth: Auth, private router: Router) {
  }

  ngOnInit() {
    console.log('logout')
    signOut(this.auth).then(() => {
      this.router.navigate(['/']);
    });
  }
}
