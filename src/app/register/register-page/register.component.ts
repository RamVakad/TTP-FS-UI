import { UserService } from '../../shared/service/user.service';
import { Component , OnInit} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserSignUpModel } from '../../shared/model/user/signup.model';
import { MatSnackBar } from '@angular/material';

//Needed to implement Reactive Forms
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  
  user: UserSignUpModel;
  form: FormGroup;

  isRegiError : boolean;
  constructor(private snackBar: MatSnackBar,
              private userService : UserService,
              private router : Router,
              private formBuilder: FormBuilder) {
      this.user = new UserSignUpModel();
    }

  openSnackBar(message: string, action: string, time: number) {
    this.snackBar.open(message, action, {
      duration: time,
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.user.name, [
        Validators.required,
        Validators.minLength(4)
      ]],
       email: [this.user.email, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-z A-Z]{2,7}$")
      ]],
       password: [this.user.password, [
        Validators.required,
        Validators.minLength(8)
      ]], 
       password2: [this.user.password2, [
        Validators.required,
        Validators.minLength(8)
      ]] 

    });
    }
  
  onSubmit() {

    this.user = Object.assign({}, this.form.value);
    
    if(this.user.password != this.user.password2){
      this.openSnackBar("Passwords do not match!", "Close", 2000);
    }
    else
    {
      this.userService.registerUser(this.user)
      .subscribe(
        (token : string) => {
          localStorage.setItem('accessToken', token);
          this.userService.fetchDetailsAndRouteHome(this.router);
          return;
        },
        (res: HttpErrorResponse) => {
          if (res.status == 422) {
            this.openSnackBar("E-Mail is already registered.", "Close", 2000);
          }
        }
        );
    }
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get password2() {
    return this.form.get('password2');
  }
}