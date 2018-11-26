import { ActionReducerMap } from "@ngrx/store";

// Importing the App State
import { AppState } from "./app.state";

// Importing the Auth Reducer
import { authReducer } from "./authStore/authStore.reducer";

// Importing the Admin Reducer
import { adminReducer } from "../../admin/adminStore/admin.reducer";

// Importing the Case Manager Reducer
import { caseManagerReducer } from "../../caseManager/caseManagerStore/caseManager.reducer";

// Importing the Phone pal Reducer
import { phonePalReducer } from "../../phonePal/phonePalStore/phonePal.reducer";

/**
 * The reducer for the whole application
 * 1. It includes the reducer for the Bond, Coding Review, User Management and other modules
 * 2. Please, add reducers for the future modules as the application grows
 */
 
export const appReducer: ActionReducerMap<AppState> = {
    auth: authReducer,
    admin: adminReducer,
    phonepal: phonePalReducer,
    casemanager: caseManagerReducer
};