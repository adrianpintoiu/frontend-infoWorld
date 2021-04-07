import { UserActionType } from './../../enums/user-action.enum';
export interface UserAction {
    name: string;
    type: UserActionType;
    isVisible?: boolean;
    importance?: string;
    disabled?: boolean;
}