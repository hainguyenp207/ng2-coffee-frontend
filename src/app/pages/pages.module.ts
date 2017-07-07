import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './pages.routing';
import { AlertComponent, } from '../components/alert/alert.component';
import { LoginComponent } from './login/login.component';
import {
    AlertService, AuthenticationService, UserService,
    OrganizationService, ActivityService, RoleService,
    RegisterService

} from 'app/_services/index';
import { UsersComponent } from './users/users.component';
import { MemberComponent } from './member/member.component';
import { HeaderComponent } from '../components/header/header.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ScoreComponent } from './member/score/score.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { ActivityComponent } from './activity/activity.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { InlineEditorModule } from 'ng2-inline-editor';
import { ToastyModule } from 'ng2-toasty';
import { ModalModule } from 'ngx-bootstrap';
import { ActivityDetailComponent } from './activity/components/activity-detail/activity-detail.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MomentModule } from 'angular2-moment';
import { NgSpinKitModule } from 'ng-spin-kit';
import { NgxPaginationModule } from 'ngx-pagination'; //
import {
    LoadingAnimateModule, LoadingAnimateService,

} from 'ng2-loading-animate';

import { CfToastComponent } from '../components/cf-toast/cf-toast.component';
import { NewUserComponent } from './users/components/new-user/new-user.component';
import { EditUserComponent } from './users/components/edit-user/edit-user.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { PointComponent } from './activity/components/point/point.component';
import { MarkComponent } from './activity/components/mark/mark.component';
import { PointManagementComponent } from './member/point-management/point-management.component';
import { ActivityManagementComponent } from './member/activity-management/activity-management.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageForbiddenComponent } from './page-forbidden/page-forbidden.component';
import { PageInternalErrorComponent } from './page-internal-error/page-internal-error.component';
import { PagesComponent } from './pages.component';
import { IndexComponent } from './main/index/index.component';
import { PostComponent } from './main/components/post/post.component';
//import { PagesModule } from './pages.module';
import { FacebookModule } from 'ngx-facebook';
import { LoginComponent } from './components/login/login.component';


@NgModule({
    imports:
    [
        CommonModule, routing,
        FormsModule,
        ToastyModule.forRoot(),
        ModalModule.forRoot(),
        NgxPaginationModule,
        Angular2FontawesomeModule,
        InlineEditorModule,
        Daterangepicker,
        MomentModule,
        NgSpinKitModule,
        LoadingAnimateModule.forRoot(),
        NgxPaginationModule,
        FacebookModule.forRoot(),
    ],
    declarations: [PagesComponent,
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
        MarkComponent,
        PointManagementComponent,
        ActivityManagementComponent,
        IndexComponent,
        PostComponent,
        LoginComponent
    ]
})
export class PagesModule {
}
