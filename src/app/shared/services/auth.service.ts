import { Injectable } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from '../models/user-profile.model';
import { SnackbarService } from './snackbar.service';
import { Role } from '../models/enum/role.enum';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user$ = new BehaviorSubject<User | null | undefined>(undefined);
  private _userProfile$ = new BehaviorSubject<UserProfile | null | undefined>(undefined);
  user$ = this._user$.pipe(filter(_ => _ !== undefined)) as Observable<User | null>;
  userProfile$ = this._userProfile$.pipe(filter(_ => _ !== undefined)) as Observable<UserProfile | null>;
  private _user: User | null | undefined;

  constructor(private supabaseService: SupabaseService,
              private userProfileService: UserProfileService,
              private snackbarService: SnackbarService) {
    this.supabaseService.client.auth.getSession().then(({data: {session}}) => {
      this._user$.next(session?.user ?? null);
    });

    this.supabaseService.client.auth.onAuthStateChange((event, session) => {
      this._user$.next(session?.user ?? null);
    });

    this.user$.subscribe(async user => {
      this._user = user;
      await this.updateUserProfile();
    });

    this.userProfile$.subscribe(userProfile => {
      this._userProfile = userProfile;
      if (this._userProfile) {
        this._userProfile.user = this._user ?? undefined;
      }
    });
  }

  private _userProfile: UserProfile | null | undefined;

  get userProfile(): UserProfile | null | undefined {
    return this._userProfile;
  }

  get isLoggedIn(): boolean {
    return !!this._user;
  }

  get userProfileId(): number | undefined {
    return this._userProfile?.id;
  }

  get userProfileRole(): Role | undefined {
    return this._userProfile?.role;
  }

  async updateUserProfile() {
    let userProfile: UserProfile | null | undefined;
    if (this._user) {
      userProfile = await this.userProfileService.getByUserId(this._user.id);
    } else {
      userProfile = null;
    }

    this._userProfile$.next(userProfile);
  }

  async login(email: string, password: string): Promise<void> {
    const response = await this.supabaseService.client.auth.signInWithPassword({email, password});

    if (response.error) {
      throw new Error('Erreur lors de la connexion', {cause: response.error});
    }

    if (response.data.weakPassword) {
      this.snackbarService.openSnackBar(response.data.weakPassword.message);
    }

    this._user$.next(response.data.user);
  }

  async register(firstname: string, lastname: string, email: string, password: string) {
    const response = await this.supabaseService.client.auth.signUp({email, password});

    if (response.error || !response.data?.user) {
      throw new Error('Erreur lors de l\'inscription', {cause: response.error});
    }

    const userProfile = await this.userProfileService.create({
      user_id: response.data.user.id,
      firstname,
      lastname
    });
    this._userProfile$.next(userProfile);
  }

  async updateUserEmail(email: string) {
    const response = await this.supabaseService.client.auth.updateUser({
      email: email,
    });

    if (response.error) {
      throw new Error('Erreur lors de la mise à jour de l\'email', {cause: response.error});
    }
  }

  async logout(): Promise<void> {
    const result = await this.supabaseService.client.auth.signOut();

    if (result.error) {
      await this.supabaseService.client.auth.refreshSession();
      throw new Error(result.error.message);
    }
  }

  async resetPassword(email: string): Promise<void> {
    const response = await this.supabaseService.client.auth.resetPasswordForEmail(email, {
      redirectTo: `${environment.angular.url}/auth/password-change`,
    });

    if (response.error) {
      throw new Error('Erreur lors de la réinitialisation du mot de passe', {cause: response.error});
    }
  }

  async updateUserPassword(password: string): Promise<void> {
    const response = await this.supabaseService.client.auth.updateUser({password: password});


    if (response.error) {
      throw new Error('Erreur lors du changement du mot de passe', {cause: response.error});
    }
  }

}
