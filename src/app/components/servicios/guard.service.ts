import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { LoginServices } from "./login.service";


export const GuardServices: CanActivateFn = () => {

    const loginService = inject(LoginServices);
    const router = inject(Router);

    if (loginService.userData) {
        return true;
    } // if;

    // this.router.navigate(['/login']); // '/login?action=4'
    window.location.href = 'login?action=3';
    // window.location.reload();
  
    return false;
    
} // GuardServices;
