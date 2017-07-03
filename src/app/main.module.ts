import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate } from '@angular/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './main.routing';
import { MainComponent } from './main.component';

import { AlertComponent, } from './components/alert/alert.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/main/components/header/header.component';
import { IndexComponent } from './pages/main/index.component';
import { PostComponent } from './pages/main/components/post/post.component';
import { ActivityComponent } from './pages/main/components/activity/activity.component';

import {
  AlertService, AuthenticationService, UserService,
  OrganizationService, ActivityService, RoleService,
  RegisterService

} from './_services/index';
import { UsersComponent } from './pages/users/users.component';
import { MemberComponent } from './pages/member/member.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScoreComponent } from './pages/member/score/score.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { InlineEditorModule } from 'ng2-inline-editor';
import { ToastyModule } from 'ng2-toasty';
import { MomentModule } from 'angular2-moment';
import { NgSpinKitModule } from 'ng-spin-kit';
import { NgxPaginationModule } from 'ngx-pagination'; //
import {
  LoadingAnimateModule, LoadingAnimateService,

} from 'ng2-loading-animate';

import { ActivityManagementComponent } from './pages/member/activity-management/activity-management.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageForbiddenComponent } from './pages/page-forbidden/page-forbidden.component';
import { PageInternalErrorComponent } from './pages/page-internal-error/page-internal-error.component';


@NgModule({
  declarations: [
    MainComponent,
    PageNotFoundComponent,
    PageForbiddenComponent,
    PageInternalErrorComponent,
    HeaderComponent,
    IndexComponent,
    ActivityComponent,
    PostComponent
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
