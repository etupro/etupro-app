import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { SnackbarService } from "../../shared/services/snackbar.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private snackbarService: SnackbarService,
    private zone: NgZone
  ) {
  }

  handleError(error: any) {
    this.zone.run(() =>
      this.snackbarService.openSnackBar(
        error?.message || 'Une erreur technique s\'est produite'
      )
    );

    console.error('Error from global error handler', error);
  }
}
