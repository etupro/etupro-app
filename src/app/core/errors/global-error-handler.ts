import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { SnackbarService } from "../../shared/services/snackbar.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private snackbarService: SnackbarService,
    private zone: NgZone
  ) {
  }

  handleError(error: any) {
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }
    this.zone.run(() =>
      this.snackbarService.openSnackBar(
        error?.message || 'Une erreur technique s\'est produite'
      )
    );

    console.error('Error from global error handler', error);
  }
}
