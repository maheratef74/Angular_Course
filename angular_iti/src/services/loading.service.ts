import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _requestCount = signal<number>(0);
  private _errorMessage = signal<string | null>(null);

  readonly isLoading = computed(() => this._requestCount() > 0);
  readonly errorMessage = computed(() => this._errorMessage());

  startRequest(): void {
    this._requestCount.update(n => n + 1);
    this._errorMessage.set(null);
  }

  endRequest(): void {
    this._requestCount.update(n => Math.max(0, n - 1));
  }

  setError(message: string): void {
    this._errorMessage.set(message);
  }

  clearError(): void {
    this._errorMessage.set(null);
  }
}
