import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

// Importing the store, App State and Auth State
import { Store } from "@ngrx/store";
import { AppState } from "../appStore/app.state";
import { AuthState } from "../appStore/authStore/authStore.state";

// Importing the take operator
import "rxjs/add/operator/take";
import "rxjs/add/operator/switchMap";

/**
 *  Authorization Interceptor that will handle the adding of the Authorization Header.
 *  1. Add the Authorization Header in the http request from local storage
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private access_token = null;

    constructor(private _store: Store<AppState>) {
        /**
         * subscribing to the store and getting the access_token
         */
        this._store.select("auth").subscribe((authState: AuthState) => {
            if(authState.access_token) {
                // console.log("Inside the constructor and access token is available");
                this.access_token = authState.access_token;
            }
            else {
                this.access_token = null;
            }
        });
    }

    // intercept method that will add tokens in the header
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("inside the intercept method");
        if(this.access_token) {
            // console.log("access token is available");
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                `Bearer ${this.access_token}`)
            });
            return next.handle(cloned);
        }
        return next.handle(req);
    }
}