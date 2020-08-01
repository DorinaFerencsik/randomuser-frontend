import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


const components = [];

const vendorModules = [
  MatButtonModule
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    ...vendorModules,
  ],
  exports: [
    ...vendorModules,
  ]
})
export class SharedModule { }
