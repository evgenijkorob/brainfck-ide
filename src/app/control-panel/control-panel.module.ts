import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { StoreModule } from '@ngrx/store';
import { controlPanelKey, controlPanelReducer } from '../_model/control-panel/reducer';
import { EffectsModule } from '@ngrx/effects';
import { ReleaseExecutionEffects } from '../_model/control-panel/effects';
import { SharedComponentsModule } from '../shared-components/shared-components.module';



@NgModule({
  declarations: [ControlPanelComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(controlPanelKey, controlPanelReducer),
    EffectsModule.forFeature([ReleaseExecutionEffects]),
    SharedComponentsModule
  ],
  exports: [ControlPanelComponent]
})
export class ControlPanelModule { }
