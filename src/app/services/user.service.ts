import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { loadingController } from '@ionic/core';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: Observable<User>;
  userDoc: Boolean;
  userItems: any;
  constructor(public firestore: AngularFirestore, public router: Router, public alertController: AlertController, public loadingController: LoadingController) { }

  userLogin(username, password) {
    //check if username exists in firebase

    //if username exists show error
    //ERROR
    //REFRESH LOGIN PAGE

    // if not
    // check user type
    // if USER,
    //set session storage
    //navigate to user-home 

    //if ADMIN,
    //set session storage
    //navigate to admin-home

  }

  async createUser(user: User): Promise<void> {
    const id = user.username; //username is the ID

    this.firestore.doc(`users/${id}`).get({
      source: 'server'
    }).subscribe(data => {
      if (!data.exists) {
        console.log(Constants.SIGN_UP_SUCCESSFUL);
        this.router.navigateByUrl(Constants.URL_ADMIN_HOME);
        return this.firestore.doc(`users/${id}`).set({
          username:user.username,
          email: user.email,
          name: user.name,
          password: user.password,
          type: user.type,
          photo: user.photoUrl
        });
      } else {
        console.log(Constants.USER_ALREADY_EXISTS);
        this.router.navigateByUrl(Constants.URL_USER_HOME);

      }

    });

  }

login(user:User){

   this.firestore.doc(`users/${user.username}`).get({
    source:'server'
  }).subscribe(data=>{
    if(data.exists){
      //user ok
      //console.log(data.id); <-- works!

      
      
    }else{
      console.log('No User!');
      
    }
  })

  

  
  
  
}



}
