import { Component, OnInit } from '@angular/core';
import { WizardHeader } from 'src/app/shared/models/wizard-header.model';

@Component({
  selector: 'app-wizard-header',
  templateUrl: './wizard-header.component.html',
  styleUrls: ['./wizard-header.component.scss']
})
export class WizardHeaderComponent implements OnInit {

  wizardNavigationDetails: WizardHeader[] = [
    {name: "General Info", routLink: "generalInfo"},
    {name: "Contact Info", routLink: "contactInfo"},
    {name: "Skill Info", routLink: "skillInfo"},
    {name: "Work Experience Info", routLink: "workExperienceInfo"},
    {name: "Done", routLink: "done"}
  ];

  constructor() { }

  ngOnInit() {
  }

}
