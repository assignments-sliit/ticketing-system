import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, Form } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Constants } from '../../constants/constants';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  //constants for texts
  btnSignInText: String = Constants.BTN_SIGN_IN_TEXT;
  btnSignUpText: String = Constants.BTN_SIGN_UP_TEXT;
  lblEmail: String = Constants.LBL_FRM_EMAIL;
  lblPassword: String = Constants.LBL_FRM_PASSWORD;

  public userLoginForm: FormGroup;

  constructor(
    public userService: UserService,
    public router: Router,
    formBuilder: FormBuilder,
    public loadingCtrl: LoadingController
  ) {
    this.userLoginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),

    });
  }

  ngOnInit() {
  }


  userLogin(formData: FormData) {
    this.userService.login(formData["email"], formData["password"]);
  }

  
  goToSignUp() {
    this.router.navigate([Constants.URL_SIGN_UP]);
  }
}
