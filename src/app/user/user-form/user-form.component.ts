import { UserUtilsService } from './../../services/user-utils.service';
import { TimeService } from './../../services/time.service';
import { DateValidator } from './../../shared/form-validators/date-validators';
import { UserModel } from '../../models/user/user-model';
import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GenderEnum } from 'src/app/enums/gender.enum';
import { UserActionType } from 'src/app/enums/user-action.enum';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges {
  @Input('user') user: UserModel;
  userForm: FormGroup = new FormGroup({});
  genders: {key: GenderEnum, value: string}[] = [];
  date: Date = new Date();
  
  constructor(private formBuilder: FormBuilder, private userUtilsService: UserUtilsService, private timeService: TimeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes.user && changes.user.currentValue){
      if(this.genders && !this.genders.length){
        this.generateGenderValue();
      }
      this.generateUserForm(changes.user.currentValue);
    }
  }

  generateUserForm(user: UserModel): void {
    this.userForm = this.formBuilder.group({
      firstName: new FormControl(user.firstName ? user.firstName : '', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')])),
      lastName: new FormControl(user.lastName ? user.lastName : '', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')])),
      birthDay: new FormControl(user.birthDay ? this.timeService.formatDateToString(user.birthDay)  : '', Validators.compose([])),
      gender: new FormControl(user.gender ? user.gender : '', Validators.compose([Validators.required])),
      cnp: new FormControl('', Validators.compose([ Validators.maxLength(13), Validators.minLength(13), Validators.pattern(/^[0-9]*$/)])),
      phoneNumber: new FormControl('', Validators.compose([Validators.pattern(/^[0-9]*$/)])),
    });
    this.validateForm();
  }

  generateGenderValue(): void {
    let keys = Object.keys(GenderEnum);
     keys.forEach(el => {
      let obj = {
        key: GenderEnum[el],
        value: el
      }
      this.genders.push(obj);
    });
  }
 
  validateForm(): void {
    this.userForm.statusChanges.subscribe((result) => {
      switch (result) {
        case "VALID":
          this.userUtilsService.setSidebarActionState({actionType: UserActionType.add, disabled: false, user: this.userForm});
          break;
        case "INVALID":
          this.userUtilsService.setSidebarActionState({actionType: UserActionType.add, disabled: true, user: this.userForm});
          break;
        default:
        break;
      }
    });

  }


}
