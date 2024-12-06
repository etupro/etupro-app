import { Pipe, PipeTransform } from '@angular/core';
import { PostLifecycle } from '../../models/enum/post_lifecycle.enum';

@Pipe({
  name: 'postLifecycle',
  standalone: true
})
export class PostLifecyclePipe implements PipeTransform {

  transform(value: PostLifecycle | string | null | undefined): string {
    switch (value) {
      case 'OPEN':
        return 'Ouvert';
      case 'ONGOING':
        return 'En cours';
      case 'FINISHED':
        return 'Terminé';
      default:
        return value ?? '';
    }
  }

}
