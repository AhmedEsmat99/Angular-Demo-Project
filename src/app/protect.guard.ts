import {inject} from '@angular/core';
import {ActivatedRouteSnapshot,RouterStateSnapshot,Router,CanActivateFn,
  ActivatedRoute,mapToCanActivate} from '@angular/router';
import { AuthService } from './auth.service';

export const protectGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  if(auth.isLoggedIn()){
    return true;
  }
  else{
    router.navigate(['/NotFound']);
    return false;
  }
};
