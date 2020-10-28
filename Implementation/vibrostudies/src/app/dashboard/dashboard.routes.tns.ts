import { Routes } from "@angular/router";
import { AuthGuardService } from "../guards/auth/auth-guard.service";
import { RoleGuardService } from "../guards/role/role-guard.service";
import { UserPermission } from "../Model/User/UserPermission";
import { AvailableStudiesComponent } from "./available-studies/available-studies.component";
import { MyStudiesComponent } from "./my-studies/my-studies.component.tns";
import { ParticipatedStudiesComponent } from "./participated-studies/participated-studies.component";
import { ProfileComponent } from "./profile/profile.component";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "available-studies",
        pathMatch: "full"
    },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: "my-studies",
        component: MyStudiesComponent,
        canActivate: [RoleGuardService, AuthGuardService],
        data: {
            expectedRole: UserPermission.CREATOR,
        }
    },
    {
        path: "available-studies",
        component: AvailableStudiesComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: "participated-studies",
        component: ParticipatedStudiesComponent,
        canActivate: [AuthGuardService],
    }
];