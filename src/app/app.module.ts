import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppProperties} from "./app.properties";
import {FirebaseOptions} from "firebase/app";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {getAuth, provideAuth} from "@angular/fire/auth";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {environment} from "../environments/environment";

const firebaseConfig: FirebaseOptions = {
  apiKey: environment.API_KEY,
  authDomain: environment.AUTH_DOMAIN,
  projectId: environment.PROJECT_ID,
  storageBucket: environment.STORAGE_BUCKET,
  messagingSenderId: environment.MESSAGING_SENDER_ID,
  appId: environment.APP_ID,
  measurementId: environment.MEASUREMENT_ID,
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  constructor() {
    console.log('AppModule constructor')
    console.log('environment: ', environment)
  }

  ngOnInit() {
    console.log('AppModule ngOnInit')
    console.log('environment: ', environment)
    console.log('environment.ZSH: ', process.env.KEY_TO_READ)
  }
}
