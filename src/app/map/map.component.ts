import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat = 10.085998;
  lng = -84.099577;

  paths: Array<any> = [
    { lat: 10.085998,  lng: -84.099577 },
    { lat: 9.976360,  lng: -84.293762 },
  ];
  paths2: Array<any> = [
    { lat: 10.085998,  lng: -84.099577 },
    { lat: 9.968065,  lng: -84.265610 },
  ];

  points: Array<any>;

  constructor() {
    this.points = [
      {
        lat: 10.085998,
        lng: -84.099577,
        label: 'Angie',
        masInfo: 'Hola Mundo',
        draggable: false
      },
      {
        lat: 9.976360,
        lng: -84.293762,
        label: 'Rosa',
        draggable: false
      },
      {
        lat: 9.968065,
        lng: -84.265610,
        label: 'Maria',
        draggable: false
      }
    ];
    // this.points = {
    //   admin: {
    //     name: 'Angie',
    //     lat: 9.934423,
    //     lng: -84.073855,
    //     micros: [
    //       {
    //         name: 'Rosa',
    //         lat: 9.934413,
    //         lng: -84.073835,
    //         manus: [
    //           {
    //             name: 'Kattia',
    //             lat: 9.934423,
    //             lng: -84.073822
    //           },
    //           {
    //             name: 'Carla',
    //             lat: 9.934428,
    //             lng: -84.073825
    //           }
    //         ]
    //       },
    //       {
    //         name: 'Maria',
    //         lat: 9.934413,
    //         lng: -84.073835,
    //         manus: [
    //           {
    //             name: 'Gilary',
    //             lat: 9.934483,
    //             lng: -84.073882
    //           },
    //           {
    //             name: 'Melissa',
    //             lat: 9.934465,
    //             lng: -84.073852
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // };
  }

  ngOnInit() {
  }

}
