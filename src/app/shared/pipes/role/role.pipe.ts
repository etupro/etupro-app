import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../../models/enum/role.enum';

@Pipe({
  name: 'role',
  standalone: true
})
export class RolePipe implements PipeTransform {

  transform(value: Role | string | null | undefined): string {
    switch (value) {
      case 'USER':
        return 'Utilisateur';
      case 'ADMIN':
        return 'Administrateur';
      case 'SUPER_ADMIN':
        return 'Super administrateur';
      default:
        return value ?? '';
    }
  }

}
