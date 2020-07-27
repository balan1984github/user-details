import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFormService } from '../shared/service/user-form.service';
import { UserForm } from '../shared/models/user-form.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  router: string;
  receivedEditData: UserForm;

  constructor(private _router: Router, private userSer: UserFormService) {

  }

  ngOnInit() {
    //   this.userSer.getSelectedRowData().subscribe(data => {
    //   console.log(data);
    //   this.receivedEditData = data;
    // });
  }

}
