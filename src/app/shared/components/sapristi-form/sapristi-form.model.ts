import { FormGroupModel } from '../../models/form-group.model';

export type SapristiFormModel = FormGroupModel<{
  external_activity: number,
  cleaning_help: boolean,
  banned_places: string,
  banned_illnesses: string
}>
