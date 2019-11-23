import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { StoreModule } from '@ngrx/store';
import { controlPanelFeatureKey, controlPanelReducer } from '../_model/control-panel/reducer';
import { EffectsModule } from '@ngrx/effects';
import { ExecutionEffects } from '../_model/control-panel/effects';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { InterpreterModule } from '../interpreter/interpreter.module';



@NgModule({
  declarations: [ControlPanelComponent],
  imports: [
    CommonModule,
    InterpreterModule,
    StoreModule.forFeature(controlPanelFeatureKey, controlPanelReducer),
    EffectsModule.forFeature([ExecutionEffects]),
    SharedComponentsModule
  ],
  exports: [ControlPanelComponent]
})
export class ControlPanelModule { }
