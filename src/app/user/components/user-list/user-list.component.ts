import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

import { IPagination } from 'src/app/shared/interfaces/pagination.interface';

import { Gender } from '../../enums/gender.enum';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public readonly genders = Gender;
  public readonly tableColumns = [
    'name',
    'gender',
    'email',
    'address'
  ];

  public filterForm: FormGroup;
  public pagination: IPagination = {
    page: 1,
    results: 10,
  };

  public userList$: Observable<IUser[]>;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      gender: [''],
    });
  }

  public ngOnInit(): void {
  }

  public onFilter() {
    // POLLING
    this.userList$ = this.userService.getUsers({
      ...this.pagination,
      ...this.filterForm.value
    });

    // MOCKING
    // this.userList$ = this.userService
    //   .getMockedUsers({
    //     ...this.pagination,
    //     ...this.filterForm.value
    //   });
  }

  onPageChange(event: PageEvent) {
    console.log('page changed: ', event);
  }
}
