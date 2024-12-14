import { FormGroupModel } from '../../../../../shared/models/form-group.model';
import { StudentInformations } from '../../../../../shared/models/student-informations';

export type StudentInformationsFormModel = FormGroupModel<Omit<StudentInformations, 'user_id' | 'created_at' | 'updated_at'>>
