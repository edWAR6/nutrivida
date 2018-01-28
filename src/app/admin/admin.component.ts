import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  photo = 'http://autokadabra.ru/system/uploads/users/20/20303/small.png?1319912650';
  name: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.photo = window.localStorage.getItem('photo');
    this.name = window.localStorage.getItem('name');
  }

  goToClients() {
    this.router.navigateByUrl('/admin/clients');
  }

  goToMap() {
    this.router.navigateByUrl('/admin');
  }

}
