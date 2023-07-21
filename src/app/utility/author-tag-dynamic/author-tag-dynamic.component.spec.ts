import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorTagDynamicComponent } from './author-tag-dynamic.component';

describe('AuthorTagDynamicComponent', () => {
  let component: AuthorTagDynamicComponent;
  let fixture: ComponentFixture<AuthorTagDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorTagDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorTagDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
