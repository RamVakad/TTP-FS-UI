import { UserService } from '../../shared/service/user.service';
import { Component , OnInit} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserSignUpModel } from '../../shared/model/user/signup.model';

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
  constructor(
    private userService : UserService,
    private router : Router,
    private formBuilder: FormBuilder) 
    {
      this.user = new UserSignUpModel();
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.user.name, [
        Validators.required
      ]],
       email: [this.user.email, [
        Validators.required
      ]],
       password: [this.user.password, [
        Validators.required,
        Validators.minLength(6)
      ]], 
       password2: [this.user.password2, [
        Validators.required,
        Validators.minLength(6)
      ]] 

    });
    }
  
  onSubmit() {

    this.user = Object.assign({}, this.form.value);
    
    if(this.user.password != this.user.password2){
      alert("Passwords do not match!");
    }
    else
    {
      this.userService.registerUser(this.user)
      .subscribe(
        (token : string) => {
          localStorage.setItem('accessToken', token);
          this.router.navigate(['/home']);
          console.log ( this.user.email + " successfully signed-in."); 
          return;
        },
        (res: HttpErrorResponse) => {
          if (res.status == 422) {
            alert("Invalid Email Provided.");
            //this.invalidCredentials = true;
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