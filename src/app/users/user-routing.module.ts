import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserTableComponent } from './user-table/user-table.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { SkillInfoComponent } from './skill-info/skill-info.component';
import { WorkExperienceInfoComponent } from './work-experience-info/work-experience-info.component';
import { FormSubmitInfoComponent } from './form-submit-info/form-submit-info.component';
import { CanDeactivateGuard } from '../shared/service/guards/can-deactivate-guard.service';
import { ViewUserDataComponent } from './view-user-data/view-user-data.component';
import { WizardHeaderComponent } from './wizard-header/wizard-header.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      {
        path: '', component: WizardHeaderComponent, children: [
          { path: '', redirectTo: 'generalInfo' },
          { path: 'generalInfo', component: GeneralInfoComponent, canDeactivate: [CanDeactivateGuard] },
          { path: 'contactInfo', component: ContactInfoComponent, canDeactivate: [CanDeactivateGuard] },
          { path: 'skillInfo', component: SkillInfoComponent, canDeactivate: [CanDeactivateGuard] },
          { path: 'workExperienceInfo', component: WorkExperienceInfoComponent, canDeactivate: [CanDeactivateGuard] },
          { path: 'done', component: FormSubmitInfoComponent }
        ]
      },
      { path: 'viewUserData', component: ViewUserDataComponent },
      { path: 'userTable', component: UserTableComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
