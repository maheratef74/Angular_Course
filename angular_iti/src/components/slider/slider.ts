import { Component, OnDestroy, signal, ChangeDetectorRef } from '@angular/core';
import { Image, IMAGES_DATA } from '../../models/image';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.html',
  styleUrls: ['./slider.css'],
})
export class Slider implements OnDestroy {
  slides: Image[] = [];
  currentIndex = signal(0);
  private readonly autoPlayDelayMs = 1000;
  private timer: any = null;

  constructor(private cdr: ChangeDetectorRef) {
    this.slides = IMAGES_DATA || [];
    this.startAutoPlay();
  }

  next(): void {
    if (this.slides.length === 0) {
      return;
    }
    this.currentIndex.update(idx => (idx + 1) % this.slides.length);
    this.cdr.detectChanges();
  }

  prev(): void {
    if (this.slides.length === 0) {
      return;
    }
    this.currentIndex.update(idx => (idx - 1 + this.slides.length) % this.slides.length);
    this.cdr.detectChanges();
  }

  play(): void {
    if (!this.timer) {
      this.startAutoPlay();
    }
  }

  stop(): void {
    this.stopAutoPlay();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.timer = setInterval(() => {
      this.next();
    }, this.autoPlayDelayMs);
  }

  private stopAutoPlay(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }
}
