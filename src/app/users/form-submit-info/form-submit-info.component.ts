import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFormService } from 'src/app/shared/service/user-form.service';
import { GeneralInfo } from 'src/app/shared/models/general-info.model';
import { ContactInfo } from 'src/app/shared/models/contact-info.model';
import { SkillInfo } from 'src/app/shared/models/skill-info.model';
import { WorkExpInfo } from 'src/app/shared/models/work-exp-info.model';

@Component({
  selector: 'app-form-submit-info',
  templateUrl: './form-submit-info.component.html',
  styleUrls: ['./form-submit-info.component.scss', './../user.component.scss']
})
export class FormSubmitInfoComponent implements OnInit {
  generalInfo: GeneralInfo;
  contactInfo: ContactInfo;
  skillInfo: SkillInfo;
  workExpInfo: WorkExpInfo;

  constructor(private router: Router, private userService: UserFormService) { }

  ngOnInit() {
    this.generalInfo = this.userService.getGeneralInfoDetails();
    this.contactInfo = this.userService.getContactInfoDetails();
    this.skillInfo = this.userService.getSkillInfoDetails();
    this.workExpInfo = this.userService.getWorkExpInfoDetails();
  }

  submitForm() {
    if (!this.generalInfo) {
      this.router.navigate(['/generalInfo'])
    }
    else if (!this.contactInfo) {
      this.router.navigate(['/contactInfo'])
    }
    else if (!this.skillInfo) {
      this.router.navigate(['/skillInfo'])
    }
    else if (!this.workExpInfo) {
      this.router.navigate(['/workExperienceInfo'])
    }
    else {
      this.userService.submitFormData();
      this.router.navigate(['/userTable']);
    }
  }
}
