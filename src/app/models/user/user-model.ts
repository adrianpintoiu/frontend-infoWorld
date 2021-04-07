import { GenderEnum } from './../../enums/gender.enum';
import { BaseModel } from "../base-model";

export class UserModel extends BaseModel {
    firstName: string;
    lastName: string;
    birthDay: Date; 
    gender: GenderEnum;
    isWaiting: boolean; 
    cnp?: number;
    phoneNumber?: number; 
    orderNumber: number;

    constructor(model?: UserModel){
        super(model);   
    }
}

