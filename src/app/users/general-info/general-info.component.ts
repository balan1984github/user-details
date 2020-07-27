import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { alphabetValidation, ageRangeEighteenToSeventyNineValidation } from 'src/app/shared/regex/validation';
import { UserFormService } from 'src/app/shared/service/user-form.service';
import { Router } from '@angular/router';
import { GeneralInfo } from 'src/app/shared/models/general-info.model';
import { CanComponentDeactivate } from 'src/app/shared/service/guards/can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss', './../user.component.scss']
})
export class GeneralInfoComponent implements OnInit, CanComponentDeactivate {

  @Output() sendGeneralInfo: EventEmitter<GeneralInfo> = new EventEmitter();

  generalInfoFormGroup: FormGroup;
  firstName = '';
  lastName = '';
  fullName = '';
  mode = '';

  constructor(private _fb: FormBuilder, private userSer: UserFormService, private router: Router) {
  }

  ngOnInit() {
    this.userSer.getMode().subscribe(val => this.mode = val);
    this.generalInfoFormGroup = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(alphabetValidation)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(alphabetValidation)]],
      fullName: [''],
      dateOfBirth: ['', [Validators.required]],
      age: ['', [Validators.pattern(ageRangeEighteenToSeventyNineValidation)]]
    });

    if (this.mode === 'Edit') {
      this.userSer.getSelectedRowData().subscribe(data => {
        if (data && JSON.stringify(data) !== '{}') {
          this.generalInfoFormGroup.setValue({
            firstName: data.firstName,
            lastName: data.lastName,
            fullName: data.fullName,
            dateOfBirth: data.dateOfBirth,
            age: data.age
          });
        }
      });
    }
  }

  /** Getting form control */
  get generalFormCtrl() { return this.generalInfoFormGroup.controls; }

  getFullName() {
    const fName = this.generalFormCtrl.firstName.value;
    const lName = this.generalFormCtrl.lastName.value;
    if (fName && lName) {
      this.generalFormCtrl.fullName.setValue(`${fName} ${lName}`);
    }

    if (fName && !lName) {
      this.generalFormCtrl.fullName.setValue(`${fName}`);
    }

    if (lName && !fName) {
      this.generalFormCtrl.fullName.setValue(`${lName}`);
    }
  }

  calcAge() {
    const bDate = this.generalFormCtrl.dateOfBirth.value;
    const dob = new Date(moment(bDate).format('DD-MMMM-YYYY'));
    const age = moment().diff(dob, 'years');
    this.generalFormCtrl.age.setValue(age);
  }

  getGeneralInfoFormValue() {
    if (this.generalInfoFormGroup.status === 'INVALID') {
      this.generalInfoFormGroup.markAllAsTouched();
    } else {
      this.userSer.addGeneralInfoDetails(this.generalInfoFormGroup.value);
      this.router.navigate(['/contactInfo'])
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.generalInfoFormGroup.status === 'INVALID') {
      return window.confirm("If you click OK then you will loss data");
    }
    return true;
  }
}
