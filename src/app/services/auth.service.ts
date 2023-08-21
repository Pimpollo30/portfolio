import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(email:string, password:string) {
    return this.http.post<any>(`${environment.API_URL}/api/auth/login`,{email, password});
  }

  getDetails() {
    return this.http.get<any>(`${environment.API_URL}/api/auth/authenticated-user-details`);
  }
}
