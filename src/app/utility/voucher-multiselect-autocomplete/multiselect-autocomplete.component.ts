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
import { Voucher } from 'src/app/model/voucher';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'voucher-multiselect-autocomplete',
  templateUrl: 'multiselect-autocomplete.component.html',
  styleUrls: ['multiselect-autocomplete.component.css'],
})
export class VoucherMultiselectAutocompleteComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  voucherCtrl = new FormControl('');
  filteredVouchers: Observable<string[]>;

  @Output() result = new EventEmitter<{ data: Array<number> }>();
  @Input() data!: Array<Voucher>;
  @Input() data_selected!: Array<Voucher>;
  @Input() key: string = '';

  vouchers: string[] = [];
  allVouchers: string[] = [];

  @ViewChild('voucherInput') voucherInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredVouchers = this.voucherCtrl.valueChanges.pipe(
      startWith(null),
      map((voucher: string | null) =>
        voucher ? this._filter(voucher) : this.allVouchers.slice()
      )
    );
  }

  ngOnChanges(): void {
    console.log(this.data_selected);
    if (this.data !== undefined && this.data_selected !== undefined) {
      this.data.forEach((item: Voucher) => {
        this.allVouchers.push(item.WpVoucher.name);
      });
      this.data_selected.forEach((item: Voucher) => {
        if (item !== undefined) {
          this.vouchers.push(item.WpVoucher.name);
        }
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our voucher
    if (value) {
      this.vouchers.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.voucherCtrl.setValue(null);
  }

  remove(voucher: string): void {
    const index = this.vouchers.indexOf(voucher);
    if (index >= 0) {
      this.vouchers.splice(index, 1);
    }
    this.emitAdjustedData();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allVouchers.filter((voucher) =>
      voucher.toLowerCase().includes(filterValue)
    );
  }

  emitAdjustedData = (): void => {
    const results: Array<number> = [];
    this.vouchers.forEach((single: string) => {
      let ele = this.data.find(
        (element) => single.localeCompare(element.WpVoucher.name) === 0
      );
      console.log(ele);
      if (ele !== undefined) {
        results.push(ele.WpVoucher.id);
      }
    });
    this.result.emit({ data: results });
  };

  selected(event: MatAutocompleteSelectedEvent): void {
    this.vouchers.push(event.option.viewValue);
    this.voucherInput.nativeElement.value = '';
    this.voucherCtrl.setValue(null);
    this.emitAdjustedData();
  }
}
