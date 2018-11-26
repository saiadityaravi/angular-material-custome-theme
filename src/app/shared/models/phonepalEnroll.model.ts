export class PhonepalEnroll {
    roleDesc: string = "phonepal"
    firstName: string;
    lastName: string;
    state: string;
    city: string
    alias:string;
    language_array: string[];
    email: string;
    phoneNumber: string
    officeLocation: string
    timezone: string;
    nominationDt: any="";
    welcomeEmailSentDt: any="";
    trainingCompletionDt: any="";
    lMSNotificationSentDt: any="";
    nominationApprovalDt: any="";
    approvedById: string="";
    avaiabilityStartDt: any
    availabilityEndDate: any
    availabilityFlag: any="";
    clientId: any="";
    subClientId: any="";
    createDt: any="";
    createdBy: any="";
    updateDt: any="";
    updatedBy: any="";
    vacationStartDt: any
    vacationEndDt: any
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}