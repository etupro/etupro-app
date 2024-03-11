import {Auth, connectAuthEmulator} from '@angular/fire/auth';
import {connectFirestoreEmulator, Firestore} from '@angular/fire/firestore';

export const connectAuthEmulatorInDevMode = (auth: Auth) =>
  connectAuthEmulator(auth, 'http://localhost:9099', {disableWarnings: true});

export const connectFirestoreEmulatorInDevMode = (firestore: Firestore) =>
  connectFirestoreEmulator(firestore, 'localhost', 8080);
