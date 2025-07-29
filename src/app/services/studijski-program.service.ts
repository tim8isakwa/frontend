import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { StudijskiProgram } from '../model/studijskiProgram';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudijskiProgramService {
  private apiUrl = 'http://localhost:8080/api/programi';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getAll(): Observable<StudijskiProgram[]> {
    return this.http.get<StudijskiProgram[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getById(id: number): Observable<StudijskiProgram> {
    return this.http.get<StudijskiProgram>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  create(program: StudijskiProgram): Observable<any> {
    return this.http.post<StudijskiProgram>(`${this.apiUrl}/kreiraj`, program, {
        headers: this.getHeaders()
    });
  }

  update(id: number, program: StudijskiProgram): Observable<StudijskiProgram> {
    return this.http.put<StudijskiProgram>(`${this.apiUrl}/${id}`, program, {
      headers: this.getHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  getByFakultetId(fakultetId: number): Observable<StudijskiProgram[]> {
    return this.http.get<StudijskiProgram[]>(`${this.apiUrl}/fakultet/${fakultetId}`, {
      headers: this.getHeaders()
    });
  }
}
