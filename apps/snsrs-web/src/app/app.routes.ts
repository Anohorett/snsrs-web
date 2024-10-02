import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('@snsrs-web/dashboard').then((m) => m.DashboardComponent)
    }
];
