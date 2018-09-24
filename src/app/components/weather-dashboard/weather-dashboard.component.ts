import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { DatosService } from '../../services/datos.service';
import { Parametros } from './../../models/parametros';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css']
})
export class WeatherDashboardComponent implements OnInit {
  chart: any;
  parametros: Parametros;
  ciudades: any;
  unidades: any;
  datosclima: any;
  constructor(private servicio: DatosService) { 
    this.parametros = new Parametros();
    this.datosclima = [];
    this.parametros.f1 = new Date();
  }
  
  ngOnInit() {
    this.getCities();
    this.getScales();
    this.getWeatherDaily();
  }
  getCities() {
    this.servicio.getCities().subscribe
    (data => {
      this.ciudades = data;
      this.parametros.ciudad = 1;
      this.getCity();
    });
  }
  getCity(){
    this.servicio.getCity(this.parametros.ciudad).subscribe
    (data => {
      this.parametros.lat = data[0].lat;
      this.parametros.lon = data[0].lon;
      this.getWeather();
    })
  }

  getScales() {
    this.servicio.getScales().subscribe
    (data => {
      this.unidades = data;
      this.parametros.unidad = "M";
    });
  }
  getWeatherDaily(){
    this.servicio.getDailyForecast().subscribe(
      data => {
        this.datosclima = data.data;
        this.Chart(this.datosclima);
      },
      error => console.log(error)
    );
  }
  getWeather() {
    if ((this.parametros.f1 !== undefined) && (this.parametros.f2 !== undefined)) {
      this.servicio.getHistoryForecast(this.parametros).subscribe(
        data => {
          this.datosclima = data.data;
          this.Chart(this.datosclima);
          
        },
        error => console.log(error)
      );
    }
  }
  Chart(datos) {
    let cTemp = [], cDate = [];
    datos.forEach(t => {
      cTemp.push(t.temp);
      if(t.date === undefined) {
        cDate.push(t.datetime);
      } else {
        cDate.push(t.date)
      }
    });
    let chart = new Chart('chart', {
      type:'line',
      data: {
        labels: cDate,
        datasets:[{
            label: 'Units',
            data: cTemp,
            borderColor: '#3399ff',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
}


