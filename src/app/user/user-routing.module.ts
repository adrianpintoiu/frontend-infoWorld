import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',  children: [
    {path: '', component: UserComponent},
    {path: 'edit/:id', component: AddEditUserComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
