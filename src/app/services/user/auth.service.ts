import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {

  }

  createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  sendPasswordResetEmail(email: string, actionCodeSettings?: firebase.auth.ActionCodeSettings | null): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email, actionCodeSettings);
  }

}
