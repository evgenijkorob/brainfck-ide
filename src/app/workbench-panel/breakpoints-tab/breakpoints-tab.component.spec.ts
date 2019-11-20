import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakpointsTabComponent } from './breakpoints-tab.component';

describe('BreakpointsTabComponent', () => {
  let component: BreakpointsTabComponent;
  let fixture: ComponentFixture<BreakpointsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakpointsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakpointsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
