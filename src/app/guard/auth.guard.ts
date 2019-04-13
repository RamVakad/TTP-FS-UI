import { UserService } from '../shared/service/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router, private service : UserService){}
  canActivate():  boolean {
      if ( localStorage.getItem('accessToken') ){      
        return true;
      }
      else{    
        this.router.navigate(["/login"])   
        return false;
      }    
  }

  canLoad(route: Route): boolean {
    if ( localStorage.getItem('accessToken') ){      
      return true;
    }
    else{    
      this.router.navigate(["/login"])   
      return false;
    } 
  }
}
