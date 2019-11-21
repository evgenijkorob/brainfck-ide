import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { userDataFeatureKey, userDataFeatureReducerMap } from '../_model/user-data/_reducer';



@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(userDataFeatureKey, userDataFeatureReducerMap)
  ],
  exports: [LoginPageComponent]
})
export class LoginPageModule { }
