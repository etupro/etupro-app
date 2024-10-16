import { Injectable } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from '../models/user-profile.model';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user$ = new BehaviorSubject<User | null | undefined>(undefined);
  private _userProfile$ = new BehaviorSubject<UserProfile | null | undefined>(undefined);
  private user$ = this._user$.pipe(filter(_ => _ !== undefined)) as Observable<User | null>;
  userProfile$ = this._userProfile$.pipe(filter(_ => _ !== undefined)) as Observable<UserProfile | null>;
  private _user: User | null | undefined;

  constructor(private supabaseService: SupabaseService,
              private userProfileService: UserProfileService,
              private snackbarService: SnackbarService) {
    this.supabaseService.client.auth.getUser().then(({data}) => {
      this._user$.next(data.user);

      this.supabaseService.client.auth.onAuthStateChange((event, session) => {
        this._user$.next(session?.user ?? null);
      });
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

  async updateUserProfile() {
    let userProfile: UserProfile | null | undefined;
    if (this._user) {
      userProfile = await this.userProfileService.getByUserId(this._user.id);
    }

    if (this._user === null) {
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
  }

  async register(displayName: string, email: string, password: string) {
    const response = await this.supabaseService.client.auth.signUp({email, password});

    if (response.error || !response.data?.user) {
      throw new Error('Erreur lors de l\'inscription', {cause: response.error});
    }

    await this.userProfileService.create({user_id: response.data.user.id, display_name: displayName});
    await this.updateUserProfile();
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
    await this.supabaseService.client.auth.signOut();
  }

  async resetPassword(email: string): Promise<void> {
    const response = await this.supabaseService.client.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://app.etupro.fr/auth/password-change',
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
