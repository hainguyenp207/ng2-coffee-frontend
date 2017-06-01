import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { AlertComponent, } from './components/alert/alert.component';
import { LoginComponent } from './login/login.component';
import {
  AlertService, AuthenticationService, UserService,
  OrganizationService, ActivityService

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
    ActivityDetailComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Angular2FontawesomeModule,
    InlineEditorModule,
    ToastyModule.forRoot(),
    ModalModule.forRoot(),
    Daterangepicker,
    MomentModule
  ],
  providers: [
    AuthenticationService,
    AlertService,
    UserService,
    OrganizationService,
    ActivityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
