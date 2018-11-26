import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PhonepalEnroll } from '../../models/phonepalEnroll.model';
import { ValidationService } from '../../../core/utilities/validation.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';


@Component({
    selector: 'app-phonepal-profile',
    templateUrl: './phonepal-profile.component.html',
    styleUrls: ['./phonepal-profile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PhonepalProfileComponent implements OnInit {
    enrollSubscription: Subscription;
    bsConfig: Partial<BsDatepickerConfig>;
    enrollForm: FormGroup;
    avaiabilityStartDt: any;
    availabilityEndDate: any;
    vacationStartDt: any;
    vacationEndDate: any;
    phonepalEnrollmodel = new PhonepalEnroll();
    minDate: Date;
    maxDate: Date;
    isDisabled: boolean = true;
    states: string[] = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
        'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
        'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
    languages: string[] = ['English', 'Spanish'];
    zones: string[] = [
        '(AKDT) Alaska Daylight Time',
        '(PST) Pacific Standard Time',
        '(MST) Mountain Standard Time',
        '(CST) Central Standard Time',
        '(EST) Eastern Standard Time',
        '(HST)	Hawaii Standard Time'
    ]
    public mask = {
        guide: false,
        showMask: false,
        mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    };
    constructor(
        private fb: FormBuilder, public messageService: SharedService
    ) {
        this.bsConfig = Object.assign({}, { containerClass: "theme-default", dateInputFormat: 'YYYY-MM-DD' });
    }

    ngOnInit() {
        this.enrollForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            alias: [''],
            email: ['', [Validators.required, ValidationService.validateEmail()]],
            city: ['', Validators.required],
            state: ['', Validators.required],
            language_array: [[], Validators.required],
            timezone: ['', Validators.required],
            phoneNumber: ['', [Validators.required, Validators.minLength(14)]],
            avaiabilityDt: ['', Validators.required],
            vacationDt: ['', Validators.required]
        })

        this.enrollSubscription = this.messageService.enrollMessage.subscribe(data => {
            this.enrollPhonepal();
        })

        this.enrollForm.controls.avaiabilityDt.valueChanges.subscribe(date => {
            this.enrollForm.controls.vacationDt.patchValue('');
        })
    }

    public getmaxAndMinDate() {
        let availabilityDate = this.enrollForm.controls.avaiabilityDt.value;
        this.avaiabilityStartDt = this.getformatedDob(availabilityDate[0]);
        this.availabilityEndDate = this.getformatedDob(availabilityDate[1]);
        this.minDate = new Date(availabilityDate[0].getFullYear(), availabilityDate[0].getMonth(), availabilityDate[0].getDate() + 1);
        this.maxDate = new Date(availabilityDate[1].getFullYear(), availabilityDate[1].getMonth(), availabilityDate[1].getDate() - 1);
        if (this.enrollForm.controls.avaiabilityDt.value != null) {
            this.isDisabled = false;
        }
    }

    public vacationDates() {
        let vacationDate = this.enrollForm.controls.vacationDt.value;
        this.vacationStartDt = this.getformatedDob(vacationDate[0]);
        this.vacationEndDate = this.getformatedDob(vacationDate[1]);
    }

    private getformatedDob(dob: any) {
        let giveDate = new Date(dob);
        let month: any = giveDate.getMonth() + 1
        month = month.toString()
        let date = giveDate.getDate().toString();
        if (date.length <= 1) {
            date = '0' + date
        }
        if (month.length <= 1) {
            month = '0' + month
        }
        let formattedDate = month + '/' + date + '/' + giveDate.getFullYear()
        return formattedDate;
    }

    getErrorMessagefirstName() {
        return this.enrollForm.controls.firstName.hasError('required') ? 'First Name is required' : null;
    }
    getErrorMessagelastName() {
        return this.enrollForm.controls.lastName.hasError('required') ? 'Last Name is required' : null;
    }
    getErrorMessageEmail() {
        return this.enrollForm.controls.email.hasError('required') ? ' Email ID is required' : 'please provide valid Email ID';
    }
    getErrorMessageCity() {
        return this.enrollForm.controls.city.hasError('required') ? ' City is required' : null;
    }
    getErrorMessageState() {
        return this.enrollForm.controls.state.hasError('required') ? ' State is required ' : null;
    }
    getErrorMessageLanguage() {
        return this.enrollForm.controls.language_array.hasError('required') ? ' Language is required' : null;
    }
    getErrorMessageTimezone() {
        return this.enrollForm.controls.timezone.hasError('required') ? 'Time zone is required' : null;
    }
    getErrorMessagePhonenumber() {
        return this.enrollForm.controls.phoneNumber.hasError('required') ? ' Phone number is required' : 'Provide valid phone number';
    }
    getErrorMessageAvailability() {
        return this.enrollForm.controls.avaiabilityDt.hasError('required') ? '  Availability is required' : null;
    }
    getErrorMessageVacation() {
        return this.enrollForm.controls.vacationDt.hasError('required') ? ' Vacation is required' : null;
    }


    enrollPhonepal() {
        if (this.enrollForm.valid) {
            this.phonepalEnrollmodel.firstName = this.enrollForm.controls.firstName.value;
            this.phonepalEnrollmodel.lastName = this.enrollForm.controls.lastName.value;
            this.phonepalEnrollmodel.email = this.enrollForm.controls.email.value;
            this.phonepalEnrollmodel.alias = this.enrollForm.controls.alias.value;
            this.phonepalEnrollmodel.state = this.enrollForm.controls.state.value;
            this.phonepalEnrollmodel.city = this.enrollForm.controls.city.value;
            this.phonepalEnrollmodel.language_array = this.enrollForm.controls.language_array.value;
            this.phonepalEnrollmodel.avaiabilityStartDt = this.avaiabilityStartDt;
            this.phonepalEnrollmodel.availabilityEndDate = this.availabilityEndDate;
            this.phonepalEnrollmodel.vacationStartDt = this.vacationStartDt;
            this.phonepalEnrollmodel.vacationEndDt = this.vacationEndDate;
            this.phonepalEnrollmodel.phoneNumber = this.enrollForm.controls.phoneNumber.value;
            this.phonepalEnrollmodel.timezone = this.enrollForm.controls.timezone.value;
            console.log(this.phonepalEnrollmodel);
        } else {
            this.markFormGroupTouched(this.enrollForm);
        }
    }
    markFormGroupTouched(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }
}