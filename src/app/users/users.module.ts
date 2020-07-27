import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table/user-table.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { WizardHeaderComponent } from './wizard-header/wizard-header.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { SkillInfoComponent } from './skill-info/skill-info.component';
import { WorkExperienceInfoComponent } from './work-experience-info/work-experience-info.component';
import { FormSubmitInfoComponent } from './form-submit-info/form-submit-info.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GenericTableComponent } from '../shared/generic-table/generic-table.component';
import { FilterPipe } from '../shared/pipes/search-text-by-table-column.pipe';
import { ViewUserDataComponent } from './view-user-data/view-user-data.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';

@NgModule({
  declarations: [
    UserComponent,
    UserTableComponent,
    WizardHeaderComponent,
    GeneralInfoComponent,
    ContactInfoComponent,
    SkillInfoComponent,
    WorkExperienceInfoComponent,
    FormSubmitInfoComponent,
    GenericTableComponent,
    ViewUserDataComponent,
    FilterPipe,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
    ]
})
export class UsersModule { }
