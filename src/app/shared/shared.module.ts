import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// Importing the dialog for the material
import { MatDialogModule } from "@angular/material";
// Importing Router Module because we are using routerLink in the header
import { RouterModule } from "@angular/router";
import { enrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'
import { BsDatepickerModule } from 'ngx-bootstrap'
import { TextMaskModule } from 'angular2-text-mask';
import { SharedService } from './services/shared.service';
import { PhonepalProfileComponent } from './components/phonepal_profile/phonepal-profile.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatDialogModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatIconModule,
        BsDatepickerModule.forRoot(),
        TextMaskModule
    ],
    declarations: [
        enrollmentDialogComponent,
        PhonepalProfileComponent
    ],
    providers: [SharedService],
    exports: [
        enrollmentDialogComponent,
        PhonepalProfileComponent
    ],
    entryComponents: [
        enrollmentDialogComponent
    ]
})
export class SharedModule { }