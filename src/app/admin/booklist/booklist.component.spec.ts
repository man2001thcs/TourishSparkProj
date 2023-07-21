import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistAdminComponent } from './booklist_admin.component';

describe('BooklistComponent', () => {
  let component: BooklistAdminComponent;
  let fixture: ComponentFixture<BooklistAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooklistAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooklistAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
