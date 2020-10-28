import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { AuthService } from "../services/auth/auth.service";
import { SideDrawerService } from "./services/side-drawer/side-drawer.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './ns-dashboard.component.tns.html',
    styleUrls: ['./dashboard.component.css']
})
export class NativeScriptDashboardComponent implements OnInit, AfterViewInit {

    constructor(private changeDetectionRef: ChangeDetectorRef, private router: Router, public authService: AuthService, public sideDrawer: SideDrawerService) {
    }

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;

    ngAfterViewInit() {
        this.sideDrawer.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        this.sideDrawer.title = "Dashboard";
    }

    logout() {
        this.authService.logout();
    }

    
}
