import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInternalErrorComponent } from './page-internal-error.component';

describe('PageInternalErrorComponent', () => {
  let component: PageInternalErrorComponent;
  let fixture: ComponentFixture<PageInternalErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageInternalErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInternalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
