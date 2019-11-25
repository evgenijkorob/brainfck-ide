import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkbenchPanelComponent } from './workbench-panel/workbench-panel.component';
import { BreakpointsTabComponent } from './breakpoints-tab/breakpoints-tab.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { StoreModule } from '@ngrx/store';
import { workbenchPanelFeatureKey, workbenchPanelReducer } from '../_model/workbench-panel/reducer';
import { OutputTabComponent } from './output-tab/output-tab.component';
import { AutoscrollDirective } from './autoscroll.directive';



@NgModule({
  declarations: [WorkbenchPanelComponent, BreakpointsTabComponent, OutputTabComponent, AutoscrollDirective],
  imports: [
    CommonModule,
    StoreModule.forFeature(workbenchPanelFeatureKey, workbenchPanelReducer),
    SharedComponentsModule
  ],
  exports: [WorkbenchPanelComponent]
})
export class WorkbenchPanelModule { }
