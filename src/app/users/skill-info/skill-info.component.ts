import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { numRangeOneToTenValidation } from 'src/app/shared/regex/validation';
import { UserFormService } from 'src/app/shared/service/user-form.service';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/shared/service/guards/can-deactivate-guard.service';

@Component({
  selector: 'app-skill-info',
  templateUrl: './skill-info.component.html',
  styleUrls: ['./skill-info.component.scss', './../user.component.scss']
})
export class SkillInfoComponent implements OnInit, CanComponentDeactivate {

  skillInfoFormGroup: FormGroup;
  newSkillInfoArr: FormArray;
  minTwoSkills = false;
  mode = '';

  skillOptions: string[] = ["JavaScript", "TypeScript", "Python"];

  constructor(private _fb: FormBuilder, private router: Router, private userSer: UserFormService) {
  }

  ngOnInit() {
    this.userSer.getMode().subscribe(val => this.mode = val);
    this.skillInfoFormGroup = this._fb.group({
      skillInfoArr: this._fb.array([])
    });

    this.skillInfoFormArray.push(this.createSkillInfo());
    if (this.mode === 'Edit') {
      this.userSer.getSelectedRowData().subscribe(data => {
        if (data && JSON.stringify(data) !== '{}') {
          this.skillInfoFormArray.clear();
          data.skillInfoArr.forEach(val => {
            this.skillInfoFormArray.push(this._fb.group({
              skillName: val.skillName,
              skillRate: val.skillRate
            }));
          });

          this.skillInfoFormGroup.patchValue({
            skillInfoArr: []
          })
        }
      });
    }
  }

  addSkillInfo() {
    this.newSkillInfoArr = this.skillInfoFormGroup.get('skillInfoArr') as FormArray;
    this.newSkillInfoArr.push(this.createSkillInfo());
  }

  createSkillInfo(): FormGroup {
    this.minTwoSkills = false;
    return this._fb.group({
      skillName: ['', [Validators.required]],
      skillRate: ['', [Validators.required, Validators.pattern(numRangeOneToTenValidation)]]
    });
  }

  deleteSkillInfo(index) {
    this.skillInfoFormArray.removeAt(index);
  }

  addSelectedSkill() {
    const skillArray = this.skillFormCtrl.skillInfoArr.value;
    let skillArraySkillName;
    if (skillArray.length && skillArray.length > 0) {
      skillArray.forEach(skill => {
        skillArraySkillName = skill.skillName;
      });
    }

    if (this.skillOptions.indexOf(skillArraySkillName) === -1) {
      this.skillOptions.push(skillArraySkillName);
    }
  }

  /** Getting form control */
  get skillFormCtrl() { return this.skillInfoFormGroup.controls; }
  get skillInfoFormArray() { return this.skillFormCtrl.skillInfoArr as FormArray; }

  getSkillInfoFormValue() {
    let skillInfoArray = this.skillInfoFormGroup.value.skillInfoArr;
    if (skillInfoArray && skillInfoArray.length < 2) {
      skillInfoArray.forEach(data => {
        if (data.skillName !== "" && data.skillRate !== "") {
          this.minTwoSkills = true;
        }
      });
    } else if (this.skillInfoFormArray.status === "INVALID") {
      this.skillInfoFormGroup.markAllAsTouched();
    } else {
      this.minTwoSkills = false;
      this.userSer.addSkillInfoDetails(this.skillInfoFormGroup.value)
      this.router.navigate(["/workExperienceInfo"])
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.skillInfoFormGroup.status === 'INVALID') {
      return window.confirm("If you click OK then you will loss data");
    }
    return true;
  }
}
