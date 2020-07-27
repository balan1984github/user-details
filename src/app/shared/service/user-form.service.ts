import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralInfo } from '../models/general-info.model';
import { ContactInfo } from '../models/contact-info.model';
import { SkillInfo } from '../models/skill-info.model';
import { WorkExpInfo } from '../models/work-exp-info.model';
import { UserForm } from '../models/user-form.model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  tableData: UserForm[] = [
    {
      firstName: "Bala", lastName: "Manian", fullName: "Bala Manian", dateOfBirth: "1978-05-20", age: 42, email: "bala@gmail.com", phoneNumber: "3483847342",
      socialInfoArr: [
        { socialURL: "facebook.com", urlType: "facebook" },
        { socialURL: "google.com", urlType: "google" }
      ],
      skillInfoArr: [
        { skillName: "HTML", skillRate: "3" },
        { skillName: "Python", skillRate: "4" }
      ],
      workExperienceInfoArr: [
        { companyName: "ideas2it", city: "Chennai", country: "India", companyURL: "ideas2it.com", role: "Technical Analyst", fromDate: "1999-04-20", toDate: "2001-03-10", experience: 1 },
        { companyName: "CTS", city: "Chennai", country: "India", companyURL: "cts.com", role: "Software Engineer", fromDate: "2001-04-10", toDate: "2005-05-20", experience: 0.6 }
      ],
      totalExperience: 5
    }
  ];

  generalInfoFormData: GeneralInfo;
  contactInfoFormData: ContactInfo;
  skillInfoFormData: SkillInfo;
  workExpInfoFormData: WorkExpInfo;
  table: any = {};
  tableMode = '';
  selectedIndex: number;

  private selectedRowDataValue = new BehaviorSubject<any>({});

  private mode = new BehaviorSubject<any>({});

  constructor(public http: HttpClient, private router: Router) { }

  selectedRowData(index, data) {
    this.selectedIndex = index;
    this.selectedRowDataValue.next(data);
  }

  getSelectedRowData(): Observable<any> {
    return this.selectedRowDataValue.asObservable();
  }

  setMode(mode) {
    this.tableMode = mode;
    this.mode.next(mode);
  }

  getMode(): Observable<string> {
    return this.mode.asObservable();
  }

  addGeneralInfoDetails(data) {
    this.generalInfoFormData = data;
  }
  getGeneralInfoDetails() {
    return this.generalInfoFormData;
  }

  addContactInfoDetails(data) {
    this.contactInfoFormData = data;
  }
  getContactInfoDetails() {
    return this.contactInfoFormData;
  }

  addSkillInfoDetails(data) {
    this.skillInfoFormData = data;
  }
  getSkillInfoDetails() {
    return this.skillInfoFormData;
  }

  addWorkExpInfoDetails(data) {
    this.workExpInfoFormData = data;
  }
  getWorkExpInfoDetails() {
    return this.workExpInfoFormData;
  }

  submitFormData() {
    this.table = { ...this.generalInfoFormData, ...this.contactInfoFormData, ...this.skillInfoFormData, ...this.workExpInfoFormData, id: Math.round(Math.random() * 100) };
    if (this.tableMode === 'Edit') {
      this.tableData.splice(this.selectedIndex, 1, this.table)
    } else {
      this.tableData.push(this.table);
    }
  }

  getTableData() {
    return this.tableData;
  }
}
