import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';

import { Parametros } from '../models/parametros';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  rootUrl = 'https://localhost:5001';
  constructor(private http: Http) {}  
  
  getCities() {
    return this.http.get(this.rootUrl + '/api/ciudades').pipe(map(response => response.json()));
  }

  getCity(id: number) {
    return this.http.get(this.rootUrl + '/api/ciudades/' + id).pipe(map(response => response.json()));
  }
  getScales() {
    return this.http.get(this.rootUrl + '/api/unidades').pipe(map(response => response.json()));
  }

  getDailyForecast(){
    return this.http.get('https://api.weatherbit.io/v2.0/forecast/daily?city=Cd.Obregon&country=MX&units=M&days=15&key=c21bc2d287044c779e69e076de9873be')
    .pipe(map(response => response.json()));
  }

  getHistoryForecast(parametros: Parametros) {
    return this.http.get('https://api.weatherbit.io/v2.0/history/energy?lat='+ parametros.lat +'&lon=' + parametros.lon +
    '&start_date=' + parametros.f1 + '&end_date=' + parametros.f2 + '&units='+ parametros.unidad +'&key=c21bc2d287044c779e69e076de9873be')
    .pipe(map(response => response.json()));
  }
}
/*
"lon": -109.44372,
"lat": 27.07028,*/