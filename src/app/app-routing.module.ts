import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path : 'login', 
    loadChildren : './login/login.module#LoginModule'
  },
  
  {
    path:'register', 
    loadChildren : './register/register.module#RegisterModule'
  },
  
  {
    path:'home', 
    loadChildren : './home/home.module#HomeModule',
    canLoad: [AuthGuard]
  },
  
  //default component
  {
    path:'**', 
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }