import { Pipe, PipeTransform } from '@angular/core';
import { EmitorStatus } from '../../models/enum/emitor-status.enum';

@Pipe({
  name: 'emitorStatus',
  standalone: true,
})
export class EmitorStatusPipe implements PipeTransform {

  transform(value: EmitorStatus | string | null | undefined): string {
    switch (value) {
      case EmitorStatus.COMMENDATAIRE:
        return 'Commanditaire';
      case EmitorStatus.STUDENT:
        return 'Étudiant';
      default:
        return value ?? '';
    }
  }

}
