import { FormGroupModel } from '../../../../../shared/models/form-group.model';
import { UserProfile } from '../../../../../shared/models/user-profile.model';

export type UserProfileFormModel = FormGroupModel<Omit<UserProfile, 'id' | 'user_id' | 'role' | 'picture_path' | 'created_at' | 'updated_at'> & {
  picture_path: File | null
}>
