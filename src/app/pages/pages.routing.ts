import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

import { ProfileComponent } from './profile/profile.component';
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
import { PageInternalErrorComponent } from './page-internal-error/page-internal-error.component'
import { PageForbiddenComponent } from './page-forbidden/page-forbidden.component'

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'login',
        loadChildren: 'app/pages/login/login.module#LoginModule'
    },
    {
        path: 'error/404',
        component: PageNotFoundComponent
    },
    {
        path: 'error/403',
        loadChildren: 'app/pages/login/login.module#LoginModule'
    },
    {
        path: 'error/500',
        loadChildren: 'app/pages/login/login.module#LoginModule'
    },
    {
        path: 'pages',
        component: PagesComponent,
        children: [
            {
                path: '', component: ActivityComponent, pathMatch: 'full'
            },
            { path: 'user/profile', component: ProfileComponent },

            { path: 'admin/users', component: UsersComponent },
            { path: 'admin/users/new', component: NewUserComponent },
            { path: 'admin/users/edit/:id', component: EditUserComponent },

            { path: 'admin/activities', component: ActivityComponent },
            { path: 'admin/activities/new', component: ActivityDetailComponent },
            { path: 'admin/activities/edit/:id', component: ActivityDetailComponent },

            { path: 'admin/organizations', component: OrganizationsComponent },

            { path: 'admin/activities', component: ActivityComponent },
            { path: 'admin/activities/new', component: ActivityDetailComponent },
            { path: 'admin/activities/edit/:id', component: ActivityDetailComponent },

            { path: 'cdb/users', component: UsersComponent },
            { path: 'cdb/users/new', component: NewUserComponent },
            { path: 'cbd/users/edit/:id', component: EditUserComponent },

            { path: 'cbd/activities', component: ActivityComponent },
            { path: 'cbd/activities/new', component: ActivityDetailComponent },
            { path: 'cbd/activities/edit/:id', component: ActivityDetailComponent },

            { path: 'cbd/activities/points', component: PointComponent },
            { path: 'cbd/activities/points/:id', component: ActivityDetailComponent },
            { path: 'cbd/activities/points/mark/:idActivity', component: MarkComponent },

            { path: 'user/point', component: PointManagementComponent },
            { path: 'user/activities', component: ActivityManagementComponent },
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
