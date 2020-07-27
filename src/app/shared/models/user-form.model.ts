import { SkillInfo } from './skill-info.model';
import { WorkExpInfo } from './work-exp-info.model';
import { SocialInfo } from './social-info.model';

export interface UserForm {
  id?: number;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  age: number;
  email: string;
  phoneNumber: string;
  skillInfoArr: SkillInfo[];
  socialInfoArr: SocialInfo[];
  workExperienceInfoArr: WorkExpInfo[];
  totalExperience: number;
}
