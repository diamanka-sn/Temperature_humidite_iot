import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config, Milieu } from '../pages/config';

@Injectable({
  providedIn: 'root'
})
export class MilieuServiceService {

  constructor(private http: HttpClient) { }

  getAllTemperature() {
    return this.http.get<Milieu[]>(`${config.apiUrl}milieu`)
  }

  getAllTemperatureMoyenne() {
    return this.http.get<Milieu[]>(`${config.apiUrl}milieu/m`)
  }
}
