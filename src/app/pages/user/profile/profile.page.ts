import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../constants/constants';
import{Storage} from '@ionic/storage';
import{UserService} from '../../../services/user.service';
import { Router, RouterEvent } from '@angular/router';
import { FormBuilder, FormGroup , Validators , FormControl } from '@angular/forms';
import{User} from '../../../models/user'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {



  public createUserForm: FormGroup;
  userStatus=this.firebaseService.userStatus;

  public user_name:any;
  public user_email:any;
  public n_ame:any;
  public photo_URL:any;
  public UI:any;

  profileTitle:String=Constants.PROFILE_TITLE;
  constructor(private firebaseService: UserService,
    public storage:Storage,
    private router:Router,
    formbuilder: FormBuilder) { 

      this.createUserForm = formbuilder.group({
        username: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', Validators.required]
       
      });

    }

  ngOnInit() {

    this.firebaseService.userChanges();
   // this.setTheValue();
    this.getTheValue();
    this.firebaseService.userStatusChanges.subscribe(x =>this.userStatus =x);
  }

  // get value from ionic storage 
  getTheValue(){
    
    this.storage.get("users").then( (val) =>{
        if(val){ 
         this.user_name=val.username;
          this.n_ame=val.name;
          this.user_email=val.email;
          this.photo_URL=val.photoURL;
          this.UI=val.id;
          console.log(this.n_ame);
          
        }else{
          this.router.navigate(["/sign-in"]);
        }
    })

   }


   // view and last one view 
   Profile_update(){
    this.router.navigate(["/profile-edit"]); 
  // const user: User = {
  //   username: this.createUserForm.value.username,
  //   name: this.createUserForm.value.name,
  //   email: this.createUserForm.value.email,
  //   password:'',
  //   type:'',
  //   photoUrl: ''
  // }

  // console.log(user);
  // this.firebaseService.userProfileUpdate(user);
  // this.firebaseService.userChanges();
  // // this.setTheValue();
  //  this.getTheValue();
 }

}
