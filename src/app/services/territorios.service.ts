import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITerritorio } from '../models/iterritorio.interface';
import { IManzana } from '../models/IManzana.interface';
import { ICongregacion } from '../models/ICongregacion.interface';
import { IRegistro } from '../models/IRegistro.interface';

@Injectable({
  providedIn: 'root'
})
export class TerritoriosService {

  private url: string = 'http://192.168.1.6:80/TerritoryAdmin/public/api/';
  private metodo: string = '';
  constructor(private  http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  searchTerritorio(text: string){
    this.metodo = this.url + 'search/1/' + text;
    console.log(this.metodo);
    return this.http.get<ITerritorio>(this.metodo).pipe(map(results => results['territorios']));
  }

  getTerritorios(){
    this.metodo = this.url + 'territorios/1';
    return this.http.get<ITerritorio>(this.metodo).pipe(map(results => results['territorios']));
  }

  getDetails(id: string) {
    return this.http.get<ITerritorio>(this.url + 'territorio/' + id).pipe(map(results => results['territorio']));
  }

  getImageByTerritorio(id: string) {
    return this.http.get<ITerritorio>(this.url + 'territorioImage/' + id);
  }

  getManzanasByTerritorio(id: string) {
    return this.http.get<IManzana>(this.url + 'manzanas/' + id).pipe(map(results => results['manzanas']));
  }

  setDataLogin(credentials): Observable<ICongregacion> {
    //console.log(JSON.stringify(credentials))
    return this.http.post<ICongregacion>(this.url + 'ingreso', JSON.stringify(credentials), this.httpOptions);
  }  

  setManzanaTerminada(id: string){
    return this.http.get<IManzana>(this.url + 'manzanaComplete/' + id).pipe(map(result => result['manzana']));
  }

  setRegistro(registro): Observable<IRegistro>{
    //console.log(JSON.stringify(registro));
    return this.http.post<IRegistro>(this.url + 'registrar', JSON.stringify(registro), this.httpOptions);
  }
}
