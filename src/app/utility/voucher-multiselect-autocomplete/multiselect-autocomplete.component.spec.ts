import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherMultiselectAutocompleteComponent } from './multiselect-autocomplete.component';

describe('MultiselectAutocompleteComponent', () => {
  let component:  VoucherMultiselectAutocompleteComponent;
  let fixture: ComponentFixture< VoucherMultiselectAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  VoucherMultiselectAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent( VoucherMultiselectAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
