import {Injectable} from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(displayName: string, email: string, password: string): Promise<void> {
    const userCreds = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(userCreds.user, {displayName})
    await signInWithEmailAndPassword(this.auth, email, password)
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

}
