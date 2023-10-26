import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Equipaje } from '../models/equipaje';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class EquipajeService {
  private url = `${base_url}/equipajes`;
  private listaCambio = new Subject<Equipaje[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Equipaje[]>(this.url);
  }
  insert(smvoIn: Equipaje) {
    return this.http.post(this.url, smvoIn);
  }
  setList(listaNueva: Equipaje[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listarId(id: number) {
    return this.http.get<Equipaje>(`${this.url}/${id}`);
  }
}
