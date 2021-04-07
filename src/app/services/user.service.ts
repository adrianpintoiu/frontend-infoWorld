import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LocalStorageEnum } from '../enums/local-storage.enum';
import { defaultUsers } from '../user/mockup-data/mock-data';
import { UserModel } from './../models/user/user-model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    users: UserModel[] = defaultUsers;

    constructor() {
        localStorage.setItem(LocalStorageEnum.userData, JSON.stringify(this.users))
    }

    getAll(): UserModel[] {
        return JSON.parse(localStorage.getItem(LocalStorageEnum.userData));
    }

    add(user: UserModel): Observable<UserModel> {
        return new Observable<UserModel>(obs => {
            let data = JSON.parse(localStorage.getItem(LocalStorageEnum.userData));
            data.push(user);
            localStorage.setItem(LocalStorageEnum.userData, JSON.stringify(data))
            if (data) {
                obs.next(data);
                obs.complete()
            } else {
                obs.error();
                obs.complete();
            }
        })

    }

    update(user: UserModel): Observable<UserModel> {
        return new Observable<UserModel>(obs => {
            let data: UserModel[] = JSON.parse(localStorage.getItem(LocalStorageEnum.userData));
            let foundIndex = data.findIndex(item => item.identity === user.identity);
            data[foundIndex] = user;
            localStorage.setItem(LocalStorageEnum.userData, JSON.stringify(data));
            if (data[foundIndex]) {
                obs.next(data[foundIndex]);
                obs.complete()
            } else {
                obs.error();
                obs.complete();
            }
        })

    }

    delete(identity: number): Observable<UserModel> {
        return new Observable<UserModel>(obs => {
            let data: UserModel[] = JSON.parse(localStorage.getItem(LocalStorageEnum.userData));
            let index = data.findIndex(item => item.identity === identity);
            if (index !== -1) {
                data.splice(index, 1);
                localStorage.setItem(LocalStorageEnum.userData, JSON.stringify(data));
                if (index) {
                    obs.next();
                    obs.complete()
                } else {
                    obs.error();
                    obs.complete();
                }
            }
        }   
    )};



}
