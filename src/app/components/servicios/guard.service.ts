import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginServices } from "./login.service";


export const GuardServices: CanActivateFn = () => {

    const loginService = inject(LoginServices);
    const router = inject(Router);

    if (loginService.userData) {
        return true;
    } // if;

    // this.router.navigate(['/login']);
    window.location.href = 'login?action=3';
    // window.location.reload();
  
    return false;
    
} // GuardServices;
