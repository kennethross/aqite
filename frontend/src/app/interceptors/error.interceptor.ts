import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, catchError, EMPTY } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const ERROR_SNACK_BAR_CONFIG: MatSnackBarConfig = {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top',
  panelClass: ['error-snackbar']
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private _snackBar: MatSnackBar,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        const { message } = err.error;
        this._snackBar.open(message ?? 'Something went wrong', '❌', 
        ERROR_SNACK_BAR_CONFIG);
        
        return throwError(err);
      })
    );
  }

}
