import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Student } from '../model/student';
import { Predmet } from '../model/predmet';
import { Obavestenje } from '../model/obavestenje';
import { Polaganje } from '../model/polaganje';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/studenti';

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

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  //Studentske funkcionalnosti

  getPredmetiKojeSlusa(studentId: number): Observable<Predmet[]> {
    return this.http.get<Predmet[]>(`${this.apiUrl}/${studentId}/predmeti`, {
      headers: this.getHeaders()
    });
  }

  getObavestenja(studentId: number): Observable<Obavestenje[]> {
    return this.http.get<Obavestenje[]>(`${this.apiUrl}/${studentId}/obavestenja`, {
      headers: this.getHeaders()
    });
  }

  getIstorija(studentId: number): Observable<Polaganje[]> {
    return this.http.get<Polaganje[]>(`${this.apiUrl}/${studentId}/istorija`, {
      headers: this.getHeaders()
    });
  }

  prijaviIspit(studentId: number, predmetId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${studentId}/prijava/${predmetId}`, {}, {
      headers: this.getHeaders()
    });
  }
}
