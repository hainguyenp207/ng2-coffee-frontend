import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfToastComponent } from './cf-toast.component';

describe('CfToastComponent', () => {
  let component: CfToastComponent;
  let fixture: ComponentFixture<CfToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
