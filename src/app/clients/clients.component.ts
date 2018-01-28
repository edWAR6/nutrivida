import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Observable<any[]>;

  constructor(angularFirestore: AngularFirestore) {
    this.clients = angularFirestore.collection('clients').valueChanges();
  }

  ngOnInit() {
  }

}
