import { Injectable } from "@angular/core";
import { User, UserResponse } from "@supabase/supabase-js";
import { SupabaseService } from "./supabase.service";
import { BehaviorSubject, filter, Observable } from "rxjs";
import { UserProfileService } from "./user-profile.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user$ = new BehaviorSubject<User | null | undefined>(undefined);
  user$ = this._user$.pipe(filter(_ => _ !== undefined)) as Observable<User | null>;
  private user: User | null | undefined;

  constructor(private supabaseService: SupabaseService, private userProfileService: UserProfileService) {
    this.supabaseService.client.auth.getUser().then(({data, error}) => {
      this._user$.next(data.user);

      this.supabaseService.client.auth.onAuthStateChange((event, session) => {
        this._user$.next(session?.user ?? null);
      });
    });

    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  async getUser(): Promise<UserResponse> {
    return await this.supabaseService.client.auth.getUser()
  }

  get userId(): string | undefined {
    return this.user?.id;
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
