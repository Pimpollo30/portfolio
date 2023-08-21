import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private http:HttpClient) { }

  getNotas() {
    return this.http.get<any>(`${environment.API_URL}/api/notas`);
  }

  agregar(titulo:string, imagen:string, descripcion:string, contenido:any) {
    return this.http.post<any>(`${environment.API_URL}/api/notas/add`,{titulo, imagen, descripcion, contenido})
  }


  getNota(id:number) {
    return this.http.get<any>(`${environment.API_URL}/api/notas/${id}`);
  }
}
