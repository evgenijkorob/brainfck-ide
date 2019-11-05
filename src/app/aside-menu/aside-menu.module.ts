import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideMenuComponent } from './aside-menu/aside-menu.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { StoreModule } from '@ngrx/store';
import { asideMenuFeatureKey, reducer } from './aside-menu.reducer';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AsideMenuComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(asideMenuFeatureKey, reducer),
    SharedComponentsModule,
    RouterModule
  ],
  exports: [AsideMenuComponent]
})
export class AsideMenuModule { }
