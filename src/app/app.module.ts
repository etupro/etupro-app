import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppProperties} from "./app.properties";
import {AngularFireModule} from "@angular/fire/compat";
import {FirebaseOptions} from "firebase/app";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const firebaseConfig: FirebaseOptions = {
  apiKey: AppProperties.FIREBASE_CONFIG.API_KEY,
  authDomain: AppProperties.FIREBASE_CONFIG.AUTH_DOMAIN,
  projectId: AppProperties.FIREBASE_CONFIG.PROJECT_ID,
  storageBucket: AppProperties.FIREBASE_CONFIG.STORAGE_BUCKET,
  messagingSenderId: AppProperties.FIREBASE_CONFIG.MESSAGING_SENDER_ID,
  appId: AppProperties.FIREBASE_CONFIG.APP_ID,
  measurementId: AppProperties.FIREBASE_CONFIG.MEASUREMENT_ID
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
