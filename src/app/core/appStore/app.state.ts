/**
 * The App State of the Application it will contain the state of the authStore, bondStore, 
 * usermanagementStore and codingreviewStore.
 */

// Importing the Auth State
import { AuthState } from "./authStore/authStore.state";

// Importing the phonepal State
import { PhonepalState } from "../../phonePal/phonePalStore/phonePal.state";

// Importing the casemanager State
import { CaseManagerState } from "../../caseManager/caseManagerStore/caseManager.state";

// Importing the User Admin State
import { AdminState } from "../../admin/adminStore/admin.state";


export interface AppState {
    auth: AuthState,
    phonepal: PhonepalState,
    casemanager: CaseManagerState,
    admin: AdminState
}