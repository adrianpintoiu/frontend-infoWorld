import { FormGroup } from '@angular/forms';
import { UserModel } from 'src/app/models/user/user-model';
import { UserActionType } from './../enums/user-action.enum';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";

@Injectable({
    providedIn: "root"
})

export class UserUtilsService {
    private sidebarActionState = new Subject<{actionType: UserActionType, disabled: boolean, user: FormGroup}>();

    constructor(){}

    setSidebarActionState(item: {actionType: UserActionType, disabled: boolean, user: FormGroup}): void {
        this.sidebarActionState.next(item);
    }

    getSidebarActionState():Observable<{actionType: UserActionType, disabled: boolean, user: FormGroup}>{
        return this.sidebarActionState.asObservable();
    }

}

