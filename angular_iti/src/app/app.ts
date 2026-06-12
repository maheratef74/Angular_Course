import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleDirective } from '../directives/theme-toggle';
import { AuthService } from '../services/auth.service';
import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleDirective } from '../directives/theme-toggle';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ThemeToggleDirective, RouterLink, RouterLinkActive],


  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('angular_iti');
  showNavbar = signal(true);

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let currentRoute = this.router.routerState.snapshot.root;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }
      this.showNavbar.set(currentRoute.data['hideNavbar'] !== true);
    });
  }
}

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let currentRoute = this.router.routerState.snapshot.root;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }
      this.showNavbar.set(currentRoute.data['hideNavbar'] !== true);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
