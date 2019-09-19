import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators,Form } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
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
     this.userLoginForm =new FormGroup({
      email: new FormControl('',  Validators.required),
      password: new FormControl('',  Validators.required),
     
    }); 
   }

   ngOnInit(): void {
    // throw new Error("Method not implemented.");
   }
 
 
   userLogin(formData: FormData) {
    
     this.userService.login(formData["email"],formData["password"])
 
   }
}
