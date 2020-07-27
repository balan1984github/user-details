import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import * as moment from 'moment';
import { alphabetValidation, urlValidation } from 'src/app/shared/regex/validation';
import { UserFormService } from 'src/app/shared/service/user-form.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/shared/service/guards/can-deactivate-guard.service';

@Component({
  selector: 'app-work-experience-info',
  templateUrl: './work-experience-info.component.html',
  styleUrls: ['./work-experience-info.component.scss', './../user.component.scss']
})
export class WorkExperienceInfoComponent implements OnInit, CanComponentDeactivate {

  workExpInfoFormGroup: FormGroup;
  workExperienceInfoArr: FormArray;
  mode = '';

  roleOptions: string[] = ["Technical Analyst", "Software Engineer"];

  constructor(private _fb: FormBuilder, private userSer: UserFormService, private router: Router) {
  }

  ngOnInit() {
    this.userSer.getMode().subscribe(val => this.mode = val);
    this.workExpInfoFormGroup = this._fb.group({
      workExperienceInfoArr: this._fb.array([]),
      totalExperience: ['']
    });

    this.workExperienceInfoFormArray.push(this.createWorkExperienceInfo());
    if (this.mode === 'Edit') {
      this.userSer.getSelectedRowData().subscribe(data => {
        if (data && JSON.stringify(data) !== '{}') {
          this.workExperienceInfoFormArray.clear();
          data.workExperienceInfoArr.forEach(val => {
            this.workExperienceInfoFormArray.push(this._fb.group({
              companyName: val.companyName,
              city: val.city,
              country: val.country,
              companyURL: val.companyURL,
              role: val.role,
              fromDate: val.fromDate,
              toDate: val.toDate,
              experience: val.experience
            }));
          });

          this.workExpInfoFormGroup.patchValue({
            workExperienceInfoArr: [],
            totalExperience: data.totalExperience
          })
        }
      });
    }
  }

  /** Getting form control */
  get workFormCtrl() { return this.workExpInfoFormGroup.controls; }
  get workExperienceInfoFormArray() { return this.workFormCtrl.workExperienceInfoArr as FormArray; }

  createWorkExperienceInfo(): FormGroup {
    return this._fb.group({
      companyName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      city: ['', [Validators.required, Validators.pattern(alphabetValidation)]],
      country: ['', [Validators.required, Validators.pattern(alphabetValidation)]],
      companyURL: ['', [Validators.required, Validators.pattern(urlValidation)]],
      role: ['', [Validators.required, Validators.pattern(alphabetValidation)]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      experience: ['', [Validators.required]]
    });
  }

  addNewWorkExperienceInfo() {
    this.workExperienceInfoFormArray.push(this.createWorkExperienceInfo());
  }

  deleteWorkExperienceInfo(index) {
    this.workExperienceInfoFormArray.removeAt(index);
  }

  addSelectedRole() {
    const rolesArray = this.workExperienceInfoFormArray.value;
    let rolesArrayRole;
    if (rolesArray.length && rolesArray.length > 0) {
      rolesArray.forEach(elem => {
        rolesArrayRole = elem.role;
      });
    }

    if (this.roleOptions.indexOf(rolesArrayRole) === -1) {
      this.roleOptions.push(rolesArrayRole);
    }
  }

  calcWorkExp(i) {
    const fromDate = moment(this.workExperienceInfoFormArray.controls[i].value.fromDate).format('DD-MMMM-YYYY');
    const toDate = moment(this.workExperienceInfoFormArray.controls[i].value.toDate).format('DD-MMMM-YYYY');
    const exp = moment(toDate).diff(fromDate, 'years', true)
    const experience = exp.toFixed(1);
    this.workExperienceInfoFormArray.controls[i].get('experience').setValue(experience);
    if(exp < 0) {
      this.workExperienceInfoFormArray.controls[i].get('experience').setErrors({experience: true});
    } else {
      this.workExperienceInfoFormArray.controls[i].get('experience').setErrors(null);
    }
    let addExp = 0;
    this.workExperienceInfoFormArray.controls.forEach((val: any) => {
      addExp += +val.controls.experience.value;
    });
    this.workFormCtrl.totalExperience.setValue(addExp);

  }

  getWorkExperienceInfoFormValue() {
    if (this.workExpInfoFormGroup.status === 'INVALID') {
      this.workExpInfoFormGroup.markAllAsTouched();
    } else {
      this.userSer.addWorkExpInfoDetails(this.workExpInfoFormGroup.value);
      this.router.navigate(['/done'])
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.workExpInfoFormGroup.status === 'INVALID') {
      return window.confirm("If you click OK then you will loss data");
    }
    return true;
  }

}
