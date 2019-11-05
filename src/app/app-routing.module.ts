import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './code-editor/editor/editor.component';


const routes: Routes = [
  { path: 'editor', component: EditorComponent },
  { path: '', redirectTo: '/editor', pathMatch: 'full' },
  { path: '**', component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
