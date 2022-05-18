import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-form-issue',
  templateUrl: './form-issue.component.html',
  styleUrls: ['./form-issue.component.scss'],
})
export class FormIssueComponent implements OnInit {
  tags = ['Frontend', 'Backend', 'Склад', 'Базы данных'];
  issueForm!: FormGroup;


  constructor(private fb: FormBuilder) {
    this.issueForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ],
      ],
      tags: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.issueForm.value);
  }
}
