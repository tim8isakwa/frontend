import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { RegistrovaniKorisnik } from '../model/registrovaniKorisnik';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
private apiUrl = 'http://localhost:8080/api/fakulteti';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getAllUsers(): Observable<RegistrovaniKorisnik[]> {
    return this.http.get<RegistrovaniKorisnik[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getUsersByStatus(aktivan: boolean): Observable<RegistrovaniKorisnik[]> {
    return this.http.get<RegistrovaniKorisnik[]>(`${this.apiUrl}/status?aktivan=${aktivan}`, {
      headers: this.getHeaders()
    });
  }

  activateUser(id: number): Observable<RegistrovaniKorisnik> {
    const endpoint = `${this.apiUrl}/aktiviraj/${id}`;
    return this.http.post<RegistrovaniKorisnik>(endpoint, {}, { headers: this.getHeaders() }); 
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
