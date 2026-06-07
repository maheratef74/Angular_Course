import { Directive, HostListener, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appThemeToggle]',
  standalone: true,
})
export class ThemeToggleDirective {
  private isDark = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.setTheme(true);
      }
    }
  }

  @HostListener('click') onClick(): void {
    this.isDark = !this.isDark;
    this.setTheme(this.isDark);
  }

  private setTheme(dark: boolean): void {
    this.isDark = dark;
    const body = this.document.body;
    if (dark) {
      this.renderer.addClass(body, 'dark-theme');
      this.renderer.setAttribute(body, 'data-bs-theme', 'dark');
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('theme', 'dark');
      }
    } else {
      this.renderer.removeClass(body, 'dark-theme');
      this.renderer.removeAttribute(body, 'data-bs-theme');
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('theme', 'light');
      }
    }
  }
}
