import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from '../landingpage/landingpage/landingpage.component';

/**
 * Main Routes of the application 
 *  1. Contain the login route (Eager Loding)
 *  2. Contain the routes for the admin Module (Lazy Loaded)
 *  3. Contain the routes for the case manager Module (Lazy Loaded)
 *  4. Contain the routes for the phonepal Module (Lazy Loaded)
 *  In the future please add the routes of the future modules
 */
const routes: Routes = [
  {
    path:"",
    component: LandingpageComponent,
    pathMatch:"full"
  },
  {
    path:"phonepal",
    loadChildren:"../phonePal/phonepal.module#PhonepalModule"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true })],
  exports: [RouterModule]
})
export class CoreRoutingModule { }