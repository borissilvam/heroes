import { fakeAsync } from "@angular/core/testing";
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject, Pipe } from '@angular/core';


export const canActivatePublicGuard: CanActivateFn = (

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {

    console.log('CanActivate');
    console.log({ route, state });

    return chekcAuthStatus() ;

};

export const canMatchPublicGuard: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
) => {
    console.log('CanMatch');
    console.log({ route, segments });

    return chekcAuthStatus();
}

const chekcAuthStatus = (): boolean | Observable<boolean> => {

    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    

    return authService.checkAutentication()
        .pipe(
            tap(isAuthenticated => {
                if( isAuthenticated) {
                    router.navigate(['./'])
                }
            }),
            map(isAuthenticated => !isAuthenticated)
        )


}