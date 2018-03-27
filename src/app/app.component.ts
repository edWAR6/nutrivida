import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
  private router: Router,
  public angularFireAuth: AngularFireAuth,
  private iconRegistry: MatIconRegistry,
  private sanitizer: DomSanitizer,
  private db: AngularFirestore) {
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('../assets/fb.svg'));
    this.angularFireAuth.authState.subscribe((data) => {
      if (data) {
        window.localStorage.setItem('uid', data.uid);
        window.localStorage.setItem('name', data.displayName);
        window.localStorage.setItem('photo', data.photoURL);
        db.collection('clients').add({uid: data.uid, name: data.displayName, photo: data.photoURL});
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigateByUrl('/');
  }

  goToAdmin() {
    this.router.navigateByUrl('/admin');
  }
}
