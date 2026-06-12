import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.startRequest();

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An unexpected error occurred. Please try again.';

      if (error.status === 0) {
        message = 'Network error — please check your connection.';
      } else if (error.status === 400) {
        message = 'Bad request — check the data you submitted.';
      } else if (error.status === 401) {
        message = 'Unauthorized — please log in.';
      } else if (error.status === 403) {
        message = 'Forbidden — you do not have permission.';
      } else if (error.status === 404) {
        message = 'Resource not found.';
      } else if (error.status >= 500) {
        message = 'Server error — please try again later.';
      }

      loadingService.setError(message);
      return throwError(() => error);
    }),
    finalize(() => {
      loadingService.endRequest();
    })
  );
};
