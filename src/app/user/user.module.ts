import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [UserListComponent],
  imports: [
    UserRoutingModule,
    CommonModule,
    SharedModule
  ],
})
export class UserModule {
  constructor() {
    console.log('userModule loaded');
  }
}
