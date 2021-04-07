import { UserModel } from './../../models/user/user-model';
import { GenderEnum } from "src/app/enums/gender.enum";

export const defaultUsers: UserModel[] = [
    {
    identity: 1,
    firstName: 'Test',
    lastName: 'unu',
    gender: GenderEnum.female,
    orderNumber: 101,
    birthDay: new Date('2003-02-25'),
    isWaiting: false
},
{
    identity: 2,
    firstName: 'Test',
    lastName: 'doi',
    orderNumber: 102,
    gender: GenderEnum.male,
    birthDay: new Date('1995-02-25'),
    isWaiting: false
}
]