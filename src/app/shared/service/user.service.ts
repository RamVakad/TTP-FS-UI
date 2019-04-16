import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { UserSignInModel } from '../model/user/signin.model';
import { UserSignUpModel } from '../model/user/signup.model';
import { UserDetailsModel } from '../model/user/details.model';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {
  readonly rootUrl = 'http://127.0.0.1:8484/api/users';
  constructor(private http: HttpClient) { 
    this.fetchDetails();
  }
  
  userData: UserDetailsModel;

  getToken(){
    return localStorage.getItem('accessToken')
  }

  signIn(user: UserSignInModel) {
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl +"/signIn", user, { responseType: 'text', headers : reqHeader});
  }

  fetchDetails() {
    this.http.get<UserDetailsModel>( this.rootUrl +"/me").subscribe(
      (userData: UserDetailsModel) => {
        this.userData = userData;
      },
      (res: HttpErrorResponse) => {
        
      }
    ); 
  }

  fetchDetailsAndRouteHome(router) {
    this.http.get<UserDetailsModel>( this.rootUrl +"/me").subscribe(
      (userData: UserDetailsModel) => {
        this.userData = userData;
        router.navigate(['/home']);
      },
      (res: HttpErrorResponse) => {

      }
    ); 
  }

  getDetails() {
    return this.userData;
  }

  registerUser(user: UserSignUpModel) {

    //This request does not need authorization 
    var reqHeader = new HttpHeaders({'No-Auth':'True'});

    //Adding Parameters
    var requestedUrl = this.rootUrl + "/signUp";

    //Testing url 
    //console.log(requestedUrl);

    //requestUrl: endpoint
    //body: Needed, but not used
    //{headers : reqHeader} : Creating object from the header library; set to non-auth 
    return this.http.post(requestedUrl , user, { responseType: 'text', headers : reqHeader});
  }

  public isAuthenticated() : boolean {
    return localStorage.getItem('accessToken') !== null;
  }

}