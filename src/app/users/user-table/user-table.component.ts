import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFormService } from 'src/app/shared/service/user-form.service';
import { UserForm } from 'src/app/shared/models/user-form.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  tableHeaders = [
    { name: 'FIRST NAME', prop: 'firstName' },
    { name: 'LAST NAME', prop: 'lastName' },
    { name: 'FULL NAME', prop: 'fullName' },
    { name: 'DOB', prop: 'dateOfBirth' },
    { name: 'AGE', prop: 'age' },
    { name: 'EMAIL', prop: 'email' },
    { name: 'PHONE', prop: 'phoneNumber' }
    ];

  formData: UserForm[] = [];

  constructor(private router: Router, private userSer: UserFormService) { }

  ngOnInit() {
    this.formData = this.userSer.getTableData();
  }

  addForm() {
    this.userSer.setMode('Add');
    this.router.navigateByUrl('/generalInfo');
  }
}
