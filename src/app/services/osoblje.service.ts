import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Student } from '../model/student';
import { Observable } from 'rxjs';
import { Obavestenje } from '../model/obavestenje';

@Injectable({
  providedIn: 'root'
})
export class OsobljeService {
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

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/kreiraj`, student, {
      headers: this.getHeaders()
    });
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student, {
      headers: this.getHeaders()
    });
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  createObavestenje(obavestenje: Obavestenje): Observable<Obavestenje> {
    return this.http.post<Obavestenje>(`${this.apiUrl}/kreiraj`, obavestenje, {
      headers: this.getHeaders()
    });
  }
}
