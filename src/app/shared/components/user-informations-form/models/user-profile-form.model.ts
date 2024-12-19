import { FormGroupModel } from '../../../models/form-group.model';
import { UserProfile } from '../../../models/user-profile.model';

export type UserProfileFormModel = FormGroupModel<Pick<UserProfile, 'display_name' | 'description' | 'phone_number'> & {
  picture_path: File | null
}>
