import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import { LoadingController, AlertController } from "@ionic/angular";
import { UserService } from "../../services/user.service";
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  public createUserForm: FormGroup;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public userService: UserService,
    formbuilder: FormBuilder,
    public router: Router
  ) {
    this.createUserForm = formbuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    /**
     * if(storage.get('userType') == 'admin'){
     *  loadPage();
     * }else{
     * alert('no permission')
     * router.navigate('/login')
     * }
     * 
     */
  }

  //async createUser

  async createUser() {
    const loading = await this.loadingCtrl.create();

    const user: User = {
      username: this.createUserForm.value.username,
      name: this.createUserForm.value.name,
      email: this.createUserForm.value.email,
      password: this.createUserForm.value.password,
      type: Constants.USER_TYPE_ADMIN,
      photoUrl: ''
    }


    //send data to the service

    this.userService.createUser(user).then(() => {
      loading.dismiss().then(() => {
      });
    },
      error => {
        console.error(error);

      }
    );

    return await loading.present();


  }




}
