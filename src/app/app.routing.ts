import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivityDetailComponent } from './activity/components/activity-detail/activity-detail.component';
// import { RegisterComponent } from './register/index';
// import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'users', component: UsersComponent },
    { path: 'activities', component: ActivityComponent },
    { path: 'activities/new', component: ActivityDetailComponent },
    { path: 'activities/edit/:id', component: ActivityDetailComponent },
    // { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);