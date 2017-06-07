import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './users/components/new-user/new-user.component';
import { EditUserComponent } from './users/components/edit-user/edit-user.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivityDetailComponent } from './activity/components/activity-detail/activity-detail.component';
import { PointComponent } from './activity/components/point/point.component';
import { MarkComponent } from './activity/components/mark/mark.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { PointManagementComponent } from './member/point-management/point-management.component'
import { ActivityManagementComponent } from './member/activity-management/activity-management.component'

// import { RegisterComponent } from './register/index';
// import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users/new', component: NewUserComponent },
    { path: 'users/edit/:id', component: EditUserComponent },
    { path: 'activities', component: ActivityComponent },
    { path: 'activities/new', component: ActivityDetailComponent },
    { path: 'activities/edit/:id', component: ActivityDetailComponent },
    { path: 'activities/points', component: PointComponent },
    { path: 'activities/points/:id', component: ActivityDetailComponent },
    { path: 'activities/points/mark/:idActivity', component: MarkComponent },
    { path: 'user/point', component: PointManagementComponent },
    { path: 'user/activities', component: ActivityManagementComponent },
    { path: 'organizations', component: OrganizationsComponent },
    // { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);