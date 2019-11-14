import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';



const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'ide', loadChildren: () => import('./ide-page/ide-page.module').then(m => m.IdePageModule) },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
