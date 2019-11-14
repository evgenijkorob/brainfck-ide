import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdePageComponent } from './ide-page.component';
import { EditorPageComponent } from '../editor-page/editor-page.component';



const routes: Routes = [
  {
    path: '',
    component: IdePageComponent,
    children: [
      {
        path: 'editor',
        component: EditorPageComponent
      },
      {
        path: '**',
        redirectTo: 'editor'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdePageRoutingModule { }
