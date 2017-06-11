import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate } from '@angular/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { AlertComponent, } from './components/alert/alert.component';
import { LoginComponent } from './pages/login/login.component';
import {
  AlertService, AuthenticationService, UserService,
  OrganizationService, ActivityService, RoleService,
  RegisterService

} from './_services/index';
import { UsersComponent } from './pages/users/users.component';
import { MemberComponent } from './pages/member/member.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScoreComponent } from './pages/member/score/score.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { InlineEditorModule } from 'ng2-inline-editor';
import { ToastyModule } from 'ng2-toasty';
import { ModalModule } from 'ngx-bootstrap';
import { ActivityDetailComponent } from './pages/activity/components/activity-detail/activity-detail.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MomentModule } from 'angular2-moment';
import { NgSpinKitModule } from 'ng-spin-kit';
import { NgxPaginationModule } from 'ngx-pagination'; //
import {
  LoadingAnimateModule, LoadingAnimateService,

} from 'ng2-loading-animate';

import { CfToastComponent } from './components/cf-toast/cf-toast.component';
import { NewUserComponent } from './pages/users/components/new-user/new-user.component';
import { EditUserComponent } from './pages/users/components/edit-user/edit-user.component';
import { OrganizationsComponent } from './pages/organizations/organizations.component';
import { PointComponent } from './pages/activity/components/point/point.component';
import { MarkComponent } from './pages/activity/components/mark/mark.component';
import { PointManagementComponent } from './pages/member/point-management/point-management.component';
import { ActivityManagementComponent } from './pages/member/activity-management/activity-management.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageForbiddenComponent } from './pages/page-forbidden/page-forbidden.component';
import { PageInternalErrorComponent } from './pages/page-internal-error/page-internal-error.component';
import { PagesComponent } from './pages/pages.component';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PageForbiddenComponent,
    PageInternalErrorComponent
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
    PagesModule

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
  bootstrap: [AppComponent]
})
export class AppModule { }
