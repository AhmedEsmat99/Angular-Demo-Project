import {inject} from '@angular/core';
import {ActivatedRouteSnapshot,RouterStateSnapshot,Router,CanActivateFn,
  ActivatedRoute,mapToCanActivate} from '@angular/router';
import { AuthService } from './auth.service';
export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const userRole = auth.getUserRole()
  if(userRole == 'Admin' || userRole == 'admin' ){
    return true;
  }
  else if (userRole == null){
    if (typeof localStorage != 'undefined') {
      localStorage.removeItem('token');
    }
    router.navigate(['/login']);
    return true;
  }
  else{
    router.navigate(['/notfound']);
    return false;
  }
};
