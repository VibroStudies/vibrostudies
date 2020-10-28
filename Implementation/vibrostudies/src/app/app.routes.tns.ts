import { Routes } from '@angular/router';
import { NativeScriptDashboardComponent } from './dashboard/ns-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StudyCreationComponent } from './studycreation/studycreation.component';
import { StudyParticipationComponent } from './studyparticipation/studyparticipation.component';

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
    component: NativeScriptDashboardComponent,
    loadChildren: () => import("@src/app/dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  {
    path: "studycreation",
    component: StudyCreationComponent,
    loadChildren: () => import("@src/app/studycreation/studycreation.module").then(m => m.StudycreationModule)
  },
  {
    path: "studyparticipation",
    component: StudyParticipationComponent,
    loadChildren: () => import("@src/app/studyparticipation/studyparticipation.module").then(m => m.StudyParticipationModule)
  }
];
