import { UserModel } from 'src/app/models/user/user-model';
import { ModalComponent } from './../../shared/components/modal/modal.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  @ViewChild('userDeleteModal') userDeleteModal: ModalComponent;
  @Input('user') user: UserModel;
  constructor() { }

  ngOnInit(): void {
  }

  open(): void{
    this.userDeleteModal.open();
  }

  delete(id: number): void {
    console.log('delete', id)
  }

}
