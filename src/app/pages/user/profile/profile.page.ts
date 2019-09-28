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


  ImgSrc:string="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";


  public createUserForm: FormGroup;
  userStatus=this.firebaseService.userStatus;

  public name:any;
  public user_email:any;
  public phone:any;
  public photo_URL:any;
  public UI:any;
  public NIC:any;
  public Acc_num:any;
  public loan:any;
  public amount:any;

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
    this.getAccount_Details();
    this.firebaseService.userStatusChanges.subscribe(x =>this.userStatus =x);
  }

  // get value from ionic storage 
  getTheValue(){
    
    this.storage.get("users").then( (val) =>{
        if(val){ 
          this.name=val.name;
            this.phone=val.phone;
            this.user_email=val.email;
            //this.photo_URL=val.photoURL;
            this.UI=val.id;
            this.NIC=val.nic;
            if(val.photoURL){
              this.ImgSrc=val.photoURL;
            }else{
              this.ImgSrc="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
            }
           
            console.log("profile"+val.photoURL);
            
          }else{
            this.ImgSrc="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
          }
    })

   }


   //acconut details
   getAccount_Details(){
    this.storage.get("account").then( (val) =>{
      if(val){ 
        this.Acc_num=val.accountnum;
          this.amount=val.amount;
          this.loan=val.loan;
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
