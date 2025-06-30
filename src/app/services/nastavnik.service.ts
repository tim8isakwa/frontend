import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Nastavnik } from '../model/nastavnik';

@Injectable({
  providedIn: 'root'
})
export class NastavnikService {
  private apiUrl = 'http://localhost:8080/api/nastavnici';

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

  getAll(): Observable<Nastavnik[]> {
    return this.http.get<Nastavnik[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getById(id: number): Observable<Nastavnik> {
    return this.http.get<Nastavnik>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  create(nastavnik: Nastavnik): Observable<Nastavnik> {
    return this.http.post<Nastavnik>(`${this.apiUrl}/kreiraj`, nastavnik, {
      headers: this.getHeaders()
    });
  }

  update(id: number, nastavnik: Nastavnik): Observable<Nastavnik> {
    return this.http.put<Nastavnik>(`${this.apiUrl}/${id}`, nastavnik, {
      headers: this.getHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
