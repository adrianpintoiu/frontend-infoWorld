import { UserService } from './../../services/user.service';
import { FormGroup } from '@angular/forms';
import { UserAction } from './../../models/user/user-action.interface';
import { UserActionType } from './../../enums/user-action.enum';
import { UserUtilsService } from './../../services/user-utils.service';
import { defaultUsers } from './../mockup-data/mock-data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user/user-model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit, OnDestroy {
  userId: number = null;
  users: UserModel[] = defaultUsers;
  user: UserModel = null;
  title: string = 'Adaugare user';
  private subscriptions: Subscription[] = [];
  userForm: FormGroup = null;

  public userActions: UserAction[] = [
    {name: 'Add', type: UserActionType.add, importance: 'primary', disabled: true},
  ]
  constructor(private activatedRoute: ActivatedRoute, private toastr: ToastrService, private userService: UserService, private userUtilsService: UserUtilsService) {
    this.activatedRoute.params.subscribe((response: Params) => {
      console.log('response', response)
      if(response.id){
        this.userId = parseInt(response.id, 10);
      } else {
       this.userId = null;
      }
    })
   }

  ngOnInit(): void {
    this.getUserDetails(this.userId);
    
    let sidebarActionsStateSubscription = this.userUtilsService.getSidebarActionState().subscribe(res => {
      this.userActions.map(action => {
          if(action.type === res.actionType){
              action.disabled = res.disabled;
          }
          this.userForm = res.user;
      });
      this.subscriptions.push(sidebarActionsStateSubscription);

  });
  }

  getUserDetails(id: number): void {
    console.log('id', id)
    if(id){
     const user = this.users.find((item) => { return item.identity === id }); 
     this.user = user;
     this.title = "Editeaza datele " + this.user.firstName;
    } else {
      let identity = this.users.length;
      let orderNumber = this.users.pop().orderNumber
      this.user = new UserModel();  
      // this.user.identity = identity+1;
      // this.user.orderNumber = orderNumber+1;
      console.log('user', this.user)
    }
  }
  onUserAction(event: UserActionType): void {
    switch (event) {
      case UserActionType.add:
          this.saveUser();
        break;
    
      default:
        break;
    }
  }


  saveUser(): void {
    if(!this.userForm){
      return;
    }
    let user = this.generateUserModel(this.userForm);
    this.userService.update(user).subscribe((ceeaceprimescvinaiout) => {
      console.log('update', user);
      this.toastr.success('Success!', `Editarea userului ${ceeaceprimescvinaiout} a reusit` );
    },(e) => {
      this.toastr.error('Error!', `Editarea userului a esuat`);
    })
  }

  generateUserModel(form: FormGroup): UserModel {
    let user = new UserModel({
      firstName: form.get('firstName').value,
      lastName: form.get('lastName').value,
      birthDay: form.get('birthDay').value,
      isWaiting: this.user.isWaiting,
      gender: form.get('gender').value,
      cnp: form.get('cnp').value,
      phoneNumber: form.get('phoneNumber').value,
      identity:  this.user.identity,
      orderNumber: this.user.orderNumber
    })
    
    return user;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(item => { return item.unsubscribe();});
  }

  
}
