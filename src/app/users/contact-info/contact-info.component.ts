import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { emailValidation, phoneValidation, urlValidation, alphabetValidation } from 'src/app/shared/regex/validation';
import { UserFormService } from 'src/app/shared/service/user-form.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/shared/service/guards/can-deactivate-guard.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss', './../user.component.scss']
})
export class ContactInfoComponent implements OnInit, CanComponentDeactivate {

  contactInfoFormGroup: FormGroup;
  mode = '';

  constructor(private _fb: FormBuilder, private userSer: UserFormService, private router: Router) {
  }

  ngOnInit() {
    this.userSer.getMode().subscribe(val => this.mode = val);
    this.contactInfoFormGroup = this._fb.group({
      email: ['', [Validators.required, Validators.pattern(emailValidation)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(phoneValidation)]],
      socialInfoArr: this._fb.array([])
    });

    this.socialInfoFormArray.push(this.createSocialInfo());
    if (this.mode === 'Edit') {
      this.userSer.getSelectedRowData().subscribe(data => {
        if (data && JSON.stringify(data) !== '{}') {
          this.socialInfoFormArray.clear();

          data.socialInfoArr.forEach(val => {
            this.socialInfoFormArray.push(this._fb.group({
              socialURL: val.socialURL,
              urlType: val.urlType
            }));
          });

          this.contactInfoFormGroup.patchValue({
            email: data.email,
            phoneNumber: data.phoneNumber,
            socialInfoArr: []
          })
        }
      });
    }
  }

  /** Getting form control */
  get contactFormCtrl() { return this.contactInfoFormGroup.controls; }
  get socialInfoFormArray() { return this.contactFormCtrl.socialInfoArr as FormArray; }

  createSocialInfo(): FormGroup {
    return this._fb.group({
      socialURL: ['', [Validators.required, Validators.pattern(urlValidation)]],
      urlType: ['', [Validators.required, Validators.pattern(alphabetValidation)]]
    });
  }

  addSocialInfo() {
    this.socialInfoFormArray.push(this.createSocialInfo());
  }

  deleteSocialInfo(index) {
    this.socialInfoFormArray.removeAt(index);
  }

  getContactInfoFormValue() {
    if (this.contactInfoFormGroup.status === 'INVALID') {
      this.contactInfoFormGroup.markAllAsTouched();
    } else {
      this.userSer.addContactInfoDetails(this.contactInfoFormGroup.value);
      this.router.navigate(['/skillInfo'])
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.contactInfoFormGroup.status === 'INVALID') {
      return window.confirm("If you click OK then you will loss data");
    }
    return true;
  }

  goBack() {
    this.router.navigate(['/generalInfo']);
  }
}
