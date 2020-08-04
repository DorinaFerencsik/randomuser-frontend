import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { IPagination } from 'src/app/shared/interfaces/pagination.interface';

import { Gender } from '../../enums/gender.enum';
import { ApiUserService } from '../../services/api-user.service';
import { IUser } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
    private userService: ApiUserService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      gender: [''],
    });
  }

  public ngOnInit(): void {
  }

  public onFilter() {
    this.userList$ = this.userService
      .getUserList({
        ...this.pagination,
        ...this.filterForm.value
      }).pipe(
        tap(resposne => this.pagination.results = resposne.info.results),
        map(response => response.results)
      );
  }
}
