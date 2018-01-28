import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { MicroComponent } from './micro/micro.component';
import { ManuComponent } from './manu/manu.component';
import { MicrosComponent } from './micros/micros.component';
import { ManusComponent } from './manus/manus.component';
import { ClientsComponent } from './clients/clients.component';
import { MicroOrdersComponent } from './micro-orders/micro-orders.component';
import { ManuOrdersComponent } from './manu-orders/manu-orders.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AnaliticsComponent } from './analitics/analitics.component';
import { MapComponent } from './map/map.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: '', component: MapComponent },
    { path: 'micros', component: MicrosComponent },
    { path: 'manus', component: ManusComponent },
    { path: 'clients', component: ClientsComponent }
  ] },
  { path: 'micro', component: MicroComponent },
  { path: 'manu', component: ManuComponent },

  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    MicroComponent,
    ManuComponent,
    MicrosComponent,
    ManusComponent,
    ClientsComponent,
    MicroOrdersComponent,
    ManuOrdersComponent,
    ClientOrdersComponent,
    PageNotFoundComponent,
    AnaliticsComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatButtonToggleModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBlYcwpI9sZsaTMxjQXUgGvTIj5R1ejYPE'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
