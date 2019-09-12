import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  userLogin(username,password){
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

  userCreate(user:User){
    //extract username and check if user is alredy there.
      //if YES,
        // show error
      
      //if not,
        //add user entry to firebase
        //set session storage
        //check usertype
          //if user,
            //navigate to user-home
          //if admin,
            //navigate to admin-home
  }

}
