import { Component, signal } from '@angular/core';
import { Products } from '../components/products/products';
import { ThemeToggleDirective } from '../directives/theme-toggle';

@Component({
  selector: 'app-root',
  imports: [Products, ThemeToggleDirective],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('angular_iti');
}

