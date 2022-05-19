import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-form-issue',
  templateUrl: './form-issue.component.html',
  styleUrls: ['./form-issue.component.scss'],
})
export class FormIssueComponent implements OnInit {
  allTags: string[] = ['Frontend', 'Backend', 'Склад', 'Базы данных'];
  issueForm!: FormGroup;

  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  tags: string[] = [];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

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
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allTags.slice()
      )
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.issueForm.value);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected($event: MatAutocompleteSelectedEvent): void {
    this.tags.push($event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((tag) =>
      tag.toLowerCase().includes(filterValue)
    );
  }
}
