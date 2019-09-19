import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,Form } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  
   public userLoginForm: FormGroup;
 
   constructor(
     public userService: UserService,
     public router: Router,
     formBuilder: FormBuilder
   ) {
     this.userLoginForm = formBuilder.group({
       username: ['', Validators.required],
       password: ['', Validators.required]
     });
   }

   ngOnInit(): void {
    // throw new Error("Method not implemented.");
   }
 
 
   userLogin() {
     const user: User = {
       username: this.userLoginForm.value.username,
       name: null,
       email: null,
       password: this.userLoginForm.value.password,
       type: Constants.USER_TYPE_ADMIN,
       photoUrl: ''
     }
     this.userService.login(user)
 
   }
}
