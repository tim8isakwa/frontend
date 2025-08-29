import { Injectable } from '@angular/core';
import { Predmet } from '../model/predmet';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PredmetService {
  private apiUrl = 'http://localhost:8080/api/predmeti';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getAll(): Observable<Predmet[]> {
    return this.http.get<Predmet[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }
}
