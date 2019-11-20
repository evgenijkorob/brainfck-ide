import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkbenchPanelComponent } from './workbench-panel/workbench-panel.component';
import { BreakpointsTabComponent } from './breakpoints-tab/breakpoints-tab.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { StoreModule } from '@ngrx/store';
import { workbenchPanelFeatureKey, workbenchPanelReducer } from '../_model/workbench-panel/reducer';



@NgModule({
  declarations: [WorkbenchPanelComponent, BreakpointsTabComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    StoreModule.forFeature(workbenchPanelFeatureKey, workbenchPanelReducer)
  ],
  exports: [WorkbenchPanelComponent]
})
export class WorkbenchPanelModule { }
