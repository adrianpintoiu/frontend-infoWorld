import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserModel } from "./../models/user/user-model";
import {  Component, OnInit, ViewChild } from "@angular/core";
import { defaultUsers } from "./mockup-data/mock-data";
import { UserService } from '../services/user.service';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
})
export class UserComponent implements OnInit {
  @ViewChild('addEditUser') addEditUser: AddEditUserComponent;
  @ViewChild('deleteUserComponent') deleteUserComponent: DeleteUserComponent;
  users: UserModel[] = [];
  user: UserModel =  new UserModel();
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.users = this.userService.getAll();
    console.log('this.users', defaultUsers)
  }

  delete(user: UserModel): void {
    this.user = new UserModel(user);
    this.deleteUserComponent.open();
  }  
 
}
