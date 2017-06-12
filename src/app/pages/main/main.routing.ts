import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: 'pages/error/404' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
