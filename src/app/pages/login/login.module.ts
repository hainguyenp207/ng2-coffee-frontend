import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AlertComponent, } from 'app/components/alert/alert.component';
import {
  AlertService, AuthenticationService, UserService,
  OrganizationService, ActivityService, RoleService,
  RegisterService

} from 'app/_services/index';
import { routing } from './login.routing'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    routing,
  ],
  declarations: [
    LoginComponent,
    AlertComponent
  ],
  providers: [
    AuthenticationService,
    AlertService,
    UserService,
    RoleService,
    OrganizationService,
    ActivityService,
    RegisterService
  ],
})
export class LoginModule { }
