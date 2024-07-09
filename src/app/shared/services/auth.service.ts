import { Injectable } from "@angular/core";
import { User } from "@supabase/supabase-js";
import { SupabaseService } from "./supabase.service";
import { BehaviorSubject, filter, Observable } from "rxjs";
import { UserProfileService } from "./user-profile.service";
import { UserProfile } from "../models/user-profile.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user$ = new BehaviorSubject<User | null | undefined>(undefined);
  private _userProfile$ = new BehaviorSubject<UserProfile | null | undefined>(undefined);
  userProfile$ = this._userProfile$.pipe(filter(_ => _ !== undefined)) as Observable<UserProfile | null>;
  private user$ = this._user$.pipe(filter(_ => _ !== undefined)) as Observable<User | null>;
  private _user: User | null | undefined;

  constructor(private supabaseService: SupabaseService, private userProfileService: UserProfileService) {
    this.supabaseService.client.auth.getUser().then(({data, error}) => {
      this._user$.next(data.user);

      this.supabaseService.client.auth.onAuthStateChange((event, session) => {
        this._user$.next(session?.user ?? null);
      });
    });

    this.user$.subscribe(async user => {
      this._user = user;
      if (user) {
        const response = await this.userProfileService.getByUserId(user.id);
        this._userProfile$.next(response?.data ?? null);
      }
    })

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

  async login(email: string, password: string): Promise<void> {
    const result = await this.supabaseService.client.auth.signInWithPassword({email, password})
    if (result.error) {
      throw new Error(result.error.message);
    }

    if (result.data.weakPassword) {
      throw new Error(result.data.weakPassword.message);
    }
  }

  async register(displayName: string, email: string, password: string) {
    const result = await this.supabaseService.client.auth.signUp({email, password});
    if (result.error) {
      throw new Error(result.error.message)
    }
    if (!result.data?.user) {
      throw new Error('Missing user data after register')
    }

    this.userProfileService.create({user_id: result.data.user.id, display_name: displayName});
  }

  async logout(): Promise<void> {
    await this.supabaseService.client.auth.signOut()
  }

}
