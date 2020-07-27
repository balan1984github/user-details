import { Component, OnInit } from '@angular/core';
import { UserFormService } from 'src/app/shared/service/user-form.service';
import { UserForm } from 'src/app/shared/models/user-form.model';

@Component({
  selector: 'app-view-user-data',
  templateUrl: './view-user-data.component.html',
  styleUrls: ['./view-user-data.component.scss']
})
export class ViewUserDataComponent implements OnInit {
  viewData: UserForm;

  constructor(private userSer: UserFormService) { }

  ngOnInit() {
    this.userSer.getSelectedRowData().subscribe(data => {
      if (data && JSON.stringify(data) !== '{}') {
        this.viewData = data;
      }
    });
  }
}
