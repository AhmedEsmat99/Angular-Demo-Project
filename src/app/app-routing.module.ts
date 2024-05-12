import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmployeeComponent } from './employee/employee.component';
import { adminGuard } from './admin.guard';
import { protectGuard } from './protect.guard';

const routes: Routes = [
  {path:'',redirectTo:'**',pathMatch:'full'},
  {path:'home',canActivate:[adminGuard],component:HomeComponent,title:'home'},
  {path:'Dashboard',canActivate:[adminGuard],component:DashboardComponent,title:'Dashboard'},
  {path:'emp',canActivate:[protectGuard ],component:EmployeeComponent,title:'Employee'},
  {path:'about',canActivate:[protectGuard ],component:AboutComponent,title:'about'},
  {path:'login',component:LoginComponent,title:'login'},
  {path:'register',component:RegisterComponent,title:'register'},
  {path:'**',component:NotFoundComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
