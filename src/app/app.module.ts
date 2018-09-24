import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';
import { DatosService } from './services/datos.service';
import { NoEncontroComponent } from './components/no-encontro/no-encontro.component';

const appRoutes: Routes = [
  {path: '', component: WeatherDashboardComponent},
  {path: 'weather-dashboard', component: WeatherDashboardComponent},
  {path: '**', component: NoEncontroComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    WeatherDashboardComponent,
    NoEncontroComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DatosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
