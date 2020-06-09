 
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private router: Router, private api: ApiService) { }

canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = this.api.getToken()
        if (token) {
            var l = this.parseJwt(token) 
            var exp = 1000*l.exp
            var now = +new Date()
            if (now < exp){ 
                return true
            }
            else{
                this.router.navigateByUrl('/login');
                return false
            }
        } else {
            this.router.navigateByUrl('/login');
            return false
        }
    }
parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
    };
}
