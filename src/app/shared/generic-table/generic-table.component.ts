import { Component, OnInit, Input } from '@angular/core';
import { UserForm } from '../models/user-form.model';
import { UserFormService } from '../service/user-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {

  tableData: UserForm[] = [];
  editUser = false;
  searchString = '';
  arrowIcon = false;
  pageIndex: number;
  pageSize: number;
  itemsCount = 0;

  @Input() set data(tableData) {
    if (tableData) {
      this.tableData = tableData;
    }
  }

  @Input() headers;
  @Input() pageConfig;

  constructor(private userSer: UserFormService, private router: Router) {
    this.pageIndex = 0;
    this.pageSize = 5;
  }

  ngOnInit() {
    if(this.tableData) {
    this.itemsCount = this.tableData.length;
  }
  }

  sort(colName) {
    this.arrowIcon = !this.arrowIcon;
    this.tableData.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
  }

  editUserData(index, data) {
    this.editUser = true;
    this.userSer.selectedRowData(index, data);
    this.userSer.setMode('Edit')
    this.router.navigate(['/generalInfo']);
  }

  viewUserData(index, data) {
    this.userSer.selectedRowData(index, data);
    this.router.navigate(['/viewUserData']);
  }

  deleteUserData(index) {
    this.tableData.splice(index, 1);
  }
}
