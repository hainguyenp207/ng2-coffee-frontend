import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate } from '@angular/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { AlertComponent, } from './components/alert/alert.component';
import { LoginComponent } from './login/login.component';
import {
  AlertService, AuthenticationService, UserService,
  OrganizationService, ActivityService, RoleService,
  RegisterService

} from './_services/index';
import { UsersComponent } from './users/users.component';
import { MemberComponent } from './member/member.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScoreComponent } from './member/score/score.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ActivityComponent } from './activity/activity.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { InlineEditorModule } from 'ng2-inline-editor';
import { ToastyModule } from 'ng2-toasty';
import { ModalModule } from 'ngx-bootstrap';
import { ActivityDetailComponent } from './activity/components/activity-detail/activity-detail.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MomentModule } from 'angular2-moment';
import { NgSpinKitModule } from 'ng-spin-kit';
import {
  LoadingAnimateModule, LoadingAnimateService,

} from 'ng2-loading-animate';

import { CfToastComponent } from './components/cf-toast/cf-toast.component';
import { NewUserComponent } from './users/components/new-user/new-user.component';
import { EditUserComponent } from './users/components/edit-user/edit-user.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { PointComponent } from './activity/components/point/point.component';
import { MarkComponent } from './activity/components/mark/mark.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    UsersComponent,
    MemberComponent,
    HeaderComponent,
    NavbarComponent,
    ScoreComponent,
    BreadcrumbComponent,
    ActivityComponent,
    FooterComponent,
    ProfileComponent,
    ActivityDetailComponent,
    CfToastComponent,
    NewUserComponent,
    EditUserComponent,
    OrganizationsComponent,
    PointComponent,
    MarkComponent

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
    LoadingAnimateModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    AlertService,
    UserService,
    RoleService,
    OrganizationService,
    ActivityService,
    RegisterService,
    LoadingAnimateService,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
