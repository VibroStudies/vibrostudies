import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './guards/auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StudyCreationComponent } from './studycreation/studycreation.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    loadChildren: () => import("@src/app/dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  {
    path: "studycreation",
    component: StudyCreationComponent,
    canActivate: [AuthGuardService],
    loadChildren: () => import("@src/app/studycreation/studycreation.module").then(m => m.StudycreationModule)
  },

];
