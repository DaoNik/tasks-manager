import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-issue',
  templateUrl: './form-issue.component.html',
  styleUrls: ['./form-issue.component.scss'],
})
export class FormIssueComponent implements OnInit {
  tags = ['Frontend', 'Backend', 'Склад', 'Базы данных'];
  constructor() {}

  ngOnInit(): void {}
}
