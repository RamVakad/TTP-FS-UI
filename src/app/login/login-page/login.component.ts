import { UserService } from '../../shared/service/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { UserSignInModel } from '../../shared/model/user/signin.model';




@Component({
  selector: 'app-name-editor',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
 
})


export class LoginComponent implements OnInit {
 
  user: UserSignInModel;
  form: FormGroup;
  invalidCredentials: boolean;

  isLoginError : boolean;
  constructor(private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private userService : UserService,
              private router : Router) {
    this.user = new UserSignInModel();
  }

   ngOnInit(){
      this.form = this.formBuilder.group({
      email: [
        this.user.email, [Validators.required]
      ],
      password: [this.user.password, [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  openSnackBar(message: string, action: string, time: number) {
    this.snackBar.open(message, action, {
      duration: time,
    });
  }

  onSubmit() {
    this.user = Object.assign({}, this.form.value);

    this.userService.signIn(this.user)
    .subscribe(
      (token : string) => {
        localStorage.setItem('accessToken', token);
        this.router.navigate(['/home']);
        //console.log ( this.user.email + " successfully signed-in."); 
        return;
      },
      (res: HttpErrorResponse) => {
        if (res.status == 422) {
          this.openSnackBar("Invalid Credentials.", "Close", 2000);
        }
      }
    );
    
  }

  get email(){
    return this.form.get('email');
  }
  
  get password(){
    return this.form.get('password');
  }

  
}
//testuser1@myhunter.cuny.edu 