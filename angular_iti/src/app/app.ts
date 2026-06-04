import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Slider } from '../components/slider/slider';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Slider],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('angular_iti');
}
