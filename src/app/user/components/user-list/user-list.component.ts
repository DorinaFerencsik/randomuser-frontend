import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { IPagination } from 'src/app/shared/interfaces/pagination.interface';

import { Gender } from '../../enums/gender.enum';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { LoadingService } from 'src/app/main/services/loading.service';

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
  public dataLength: number;
  public userList: IUser[];

  private readonly defaultLength = 100;

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      gender: [''],
      useMock: ['']
    });
  }

  public ngOnInit(): void {
    this.dataLength = this.defaultLength;
  }

  public onFilter() {
    const { gender, useMock } = this.filterForm.value;
    this.loadingService.startLoading();
    this.userService.getUsers({
        ...this.pagination,
        gender
      },
      useMock,
    ).pipe(
      tap(() => this.dataLength = this.defaultLength + this.pagination.page * this.pagination.results),
      finalize(() => this.loadingService.stopLoading())
    ).subscribe(result => this.userList = result);

  }

  onPageChange(event: PageEvent) {
    this.pagination.page = event.pageIndex + 1;
    this.onFilter();
  }
}
