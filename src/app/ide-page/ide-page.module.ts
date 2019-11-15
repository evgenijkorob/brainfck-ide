import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdePageRoutingModule } from './ide-page-routing.module';
import { IdePageComponent } from './ide-page.component';
import { AsideMenuModule } from '../aside-menu/aside-menu.module';
import { EditorPageModule } from '../editor-page/editor-page.module';


@NgModule({
  declarations: [IdePageComponent],
  imports: [
    CommonModule,
    IdePageRoutingModule,
    EditorPageModule
  ],
  exports: [IdePageComponent]
})
export class IdePageModule { }
