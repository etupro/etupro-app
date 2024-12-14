import { FormControl } from '@angular/forms';

export type FormGroupModel<T> = {
  [K in keyof T]: FormControl<T[K]>;
};
