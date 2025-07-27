import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Credentials } from '../../dto/credentials.dto';
import { TokenService } from '../common/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // Adjust your API base URL as needed

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(credentials: Credentials): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.tokenService.setToken(response.token);
        }
      })
    );
  }

  signIn(credentials: Credentials): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.tokenService.setToken(response.token);
        }
      })
    );
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  isAuthenticated(): boolean {
    return this.tokenService.hasToken();
  }
}
