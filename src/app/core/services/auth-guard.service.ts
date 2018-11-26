import { Injectable } from "@angular/core";
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";

// Importing the store, App State and Auth State
import { Store } from "@ngrx/store";
import { AppState } from "../appStore/app.state";
import { AuthState } from "../appStore/authStore/authStore.state";

// Importing the Auth Service
import { AuthorizationService } from "../services/authorization.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    // injecting the authorization service for finding whether user has logged in or not
    constructor(
        private _store: Store<AppState>,
        private _router: Router,
        private _authService: AuthorizationService
    ) {}

    // canActivate method to check whether user has logged in or not
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    
        const authenticated: boolean = this._authService.isLoggedIn();

        if(authenticated) {
            return true;
        }
        else {
            this._router.navigate(["login"]);
        }
    }
}