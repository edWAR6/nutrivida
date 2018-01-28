import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  points: any;

  constructor() {
    this.points = {
      admin: {
        name: 'Angie',
        lat: 9.934423,
        lng: -84.073855,
        micros: [
          {
            name: 'Rosa',
            lat: 9.934413,
            lng: -84.073835,
            manus: [
              {
                name: 'Kattia',
                lat: 9.934423,
                lng: -84.073822
              },
              {
                name: 'Carla',
                lat: 9.934428,
                lng: -84.073825
              }
            ]
          },
          {
            name: 'Maria',
            lat: 9.934413,
            lng: -84.073835,
            manus: [
              {
                name: 'Gilary',
                lat: 9.934483,
                lng: -84.073882
              },
              {
                name: 'Melissa',
                lat: 9.934465,
                lng: -84.073852
              }
            ]
          }
        ]
      }
    };
  }

  ngOnInit() {
  }

}
