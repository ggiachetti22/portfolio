import { Routes } from '@angular/router';
import { GuardServices } from './components/servicios/guard.service';

// export const routes: Routes = [];

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // dashboard panel
    { path: 'home', loadChildren: () => import('./components/home/home.routes').then(m => m.HOME_ROUTES) },
    { path: 'chat', loadChildren: () => import('./components/chat/chat.routes').then(m => m.CHAT_ROUTES)}, //canActivate: [GuardServices] }, // canActivate: [GuardServices]
    { path: 'login', loadChildren: () => import('./components/login/login.routes').then(m => m.LOGIN_ROUTES) },
    { path: 'create', loadChildren: () => import('./components/new-user/new-user.routes').then(m => m.NewUser_ROUTES) },
    { path: '**', loadChildren: () => import('./components/error/error.routes').then(m => m.ERROR_ROUTES) }
    // { path: '**', component: ErrorComponent }
        // { path: 'other', loadChildren: () => import('./other/other.routes').then(m => m.OTHER_ROUTES) }
];
