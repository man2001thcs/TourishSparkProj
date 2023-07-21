import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ItemData } from 'src/app/model/item-data';
import { Author } from 'src/app/model/author';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'author-multiselect-autocomplete',
  templateUrl: 'multiselect-autocomplete.component.html',
  styleUrls: ['multiselect-autocomplete.component.css'],
})
export class AuthorMultiselectAutocompleteComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  authorCtrl = new FormControl('');
  filteredAuthors: Observable<string[]>;

  @Output() result = new EventEmitter<{ data: Array<number> }>();
  @Input() data!: Array<Author>;
  @Input() data_selected!: Array<Author>;
  @Input() key: string = '';

  authors: string[] = [];
  allAuthors: string[] = [];

  @ViewChild('authorInput') authorInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredAuthors = this.authorCtrl.valueChanges.pipe(
      startWith(null),
      map((author: string | null) =>
        author ? this._filter(author) : this.allAuthors.slice()
      )
    );
  }

  ngOnChanges(): void {
    console.log(this.data);
    if (this.data !== undefined && this.data_selected !== undefined) {
      this.data.forEach((item: Author) => {
        this.allAuthors.push(item.WpAuthor.name);
      });
      this.data_selected.forEach((item: Author) => {
        this.authors.push(item.WpAuthor.name);
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our author
    if (value) {
      this.authors.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.authorCtrl.setValue(null);
  }

  remove(author: string): void {
    const index = this.authors.indexOf(author);
    if (index >= 0) {
      this.authors.splice(index, 1);
    }
    this.emitAdjustedData();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allAuthors.filter((author) =>
      author.toLowerCase().includes(filterValue)
    );
  }

  emitAdjustedData = (): void => {
    const results: Array<number> = [];
    this.authors.forEach((single: string) => {
      let ele = this.data.find((element) => (single.localeCompare(element.WpAuthor.name) === 0));
      console.log(ele);
      if (ele !== undefined) {
        results.push(ele.WpAuthor.id);
      }
    });
    this.result.emit({ data: results });
  };

  selected(event: MatAutocompleteSelectedEvent): void {
    this.authors.push(event.option.viewValue);
    this.authorInput.nativeElement.value = '';
    this.authorCtrl.setValue(null);
    this.emitAdjustedData();
  }
}
