import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: 'editor', loadChildren: () => import('./editor-page/editor-page.module').then(m => m.EditorPageModule) },
  { path: '', redirectTo: '/editor', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
