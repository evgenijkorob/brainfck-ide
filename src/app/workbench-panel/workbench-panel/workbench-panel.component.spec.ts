import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkbenchPanelComponent } from './workbench-panel.component';

describe('WorkbenchPanelComponent', () => {
  let component: WorkbenchPanelComponent;
  let fixture: ComponentFixture<WorkbenchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkbenchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkbenchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
