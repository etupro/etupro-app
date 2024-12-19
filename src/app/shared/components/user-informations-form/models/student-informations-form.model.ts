import { FormGroupModel } from '../../../models/form-group.model';
import { StudentInformation } from '../../../models/student-information';

export type StudentInformationsFormModel = FormGroupModel<Pick<StudentInformation, 'study_institute' | 'study_level' | 'study_label' | 'skills'>>
