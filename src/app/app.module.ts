import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FirebaseOptions} from "firebase/app";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {initializeAuth, provideAuth} from '@angular/fire/auth';
import {getApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {environment} from "../environments/environment";
import {connectAuthEmulatorInDevMode, connectFirestoreEmulatorInDevMode} from "./emulator";

const firebaseConfig: FirebaseOptions = {
  apiKey: environment.FIREBASE.API_KEY,
  authDomain: environment.FIREBASE.AUTH_DOMAIN,
  projectId: environment.FIREBASE.PROJECT_ID,
  storageBucket: environment.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: environment.FIREBASE.MESSAGING_SENDER_ID,
  appId: environment.FIREBASE.APP_ID,
  measurementId: environment.FIREBASE.MEASUREMENT_ID,
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => {
      const auth = initializeAuth(getApp());
      connectAuthEmulatorInDevMode(auth);
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      connectFirestoreEmulatorInDevMode(firestore);
      return firestore;
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
