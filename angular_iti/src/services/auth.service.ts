import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000/users';
  
  // Track logged in user using Angular Signals
  currentUser = signal<User | null>(null);
  
  // Computed signal for login status
  isLoggedIn = computed(() => this.currentUser() !== null);

  constructor(private http: HttpClient) {
    // Check if user is logged in from localStorage on service initialization
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          this.currentUser.set(JSON.parse(storedUser));
        } catch (e) {
          localStorage.removeItem('currentUser');
        }
      }
    }
  }

  // Register a new user after verifying duplicate email
  register(userData: Omit<User, 'id'>): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${userData.email}`).pipe(
      switchMap((users) => {
        if (users.length > 0) {
          return throwError(() => new Error('This email is already registered!'));
        }
        return this.http.post<User>(this.apiUrl, userData);
      })
    );
  }

  // Login verification
  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      switchMap((users) => {
        if (users.length === 1 && users[0].password === password) {
          const user = users[0];
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          this.currentUser.set(user);
          return of(user);
        } else {
          return throwError(() => new Error('Invalid email or password!'));
        }
      })
    );
  }

  // Logout current user
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('currentUser');
    }
    this.currentUser.set(null);
  }
}
