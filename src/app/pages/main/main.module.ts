import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate } from '@angular/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MainComponent } from './main.component';
import { routing } from './main.routing';

import {
  AlertService, AuthenticationService, UserService,
  OrganizationService, ActivityService, RoleService,
  RegisterService

} from '../../_services/index';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { InlineEditorModule } from 'ng2-inline-editor';
import { ToastyModule } from 'ng2-toasty';
import { ModalModule } from 'ngx-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MomentModule } from 'angular2-moment';
import { NgSpinKitModule } from 'ng-spin-kit';
import { NgxPaginationModule } from 'ngx-pagination'; //
import {
  LoadingAnimateModule, LoadingAnimateService,

} from 'ng2-loading-animate';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routing,
    Angular2FontawesomeModule,
    InlineEditorModule,
    ToastyModule.forRoot(),
    ModalModule.forRoot(),
    Daterangepicker,
    MomentModule,
    NgSpinKitModule,
    LoadingAnimateModule.forRoot(),
    NgxPaginationModule,
    BrowserAnimationsModule,

  ],
  providers: [
    AuthenticationService,
    UserService,
    RoleService,
    OrganizationService,
    ActivityService,
    RegisterService,
    LoadingAnimateService,

  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
