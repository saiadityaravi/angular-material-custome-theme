import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { SharedService } from '../../services/shared.service';


@Component({
    selector: 'app-enrollment-dialog',
    templateUrl: './enrollment-dialog.component.html',
    styleUrls: ['./enrollment-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class enrollmentDialogComponent implements OnInit {

    constructor(
        private dialogRef: MatDialogRef<enrollmentDialogComponent>, public messageService: SharedService
    ) {
    }

    ngOnInit() {

    }

    close() {
        this.dialogRef.close(false);
    }

    enrollPhonepal() {
        this.messageService.setEnroolMessage();
    }

}