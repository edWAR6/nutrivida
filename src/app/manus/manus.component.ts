import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-manus',
  templateUrl: './manus.component.html',
  styleUrls: ['./manus.component.css']
})
export class ManusComponent implements OnInit {
  clients: Observable<any[]>;

  constructor(angularFirestore: AngularFirestore) {
    this.clients = angularFirestore.collection('clients').valueChanges();
  }

  ngOnInit() {
  }

}
