import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { UserService } from "../../../services/user.service";
import { Constants } from 'src/app/constants/constants';
import{Storage} from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public user_name:any;
  public user_email:any;
  public phone:any;
  public photo_URL:any;
  public UI:any;

  pages =[
    {
      title:Constants.PROFILE,
      url:'/menu/profile',
      icon:'md-person'
    },
    {
      title:'Home',
      url:'/menu/users-home',
      icon:'md-home'
    },
    {
      title:'TimeTable',
      url:'/menu/view-time-table',
      icon:'md-clock'
    }
    ];

    selectedPath="";

    constructor(private router:Router,private firebaseService:UserService, public storage:Storage,) {
      this.router.events.subscribe((event:RouterEvent)=>{
           this.selectedPath=event.url;
      });
     }

     userStatus=this.firebaseService.userStatus;
     ngOnInit() {

      
       
     }

      async getTheValue(){
    
      this.storage.get("users").then( (val) =>{
          if(val){ 
           this.user_name=val.name;
            this.phone=val.phone;
            this.user_email=val.email;
            this.photo_URL=val.photoURL;
            this.UI=val.id;
            console.log(this.user_name);
            
          }else{
            this.router.navigate(["/sign-in"]);
          }
      })
  
     }
    
     ionViewWillEnter(){
      this.firebaseService.userChanges();
      this.getTheValue();
      
     this.firebaseService.userStatusChanges.subscribe(x =>this.userStatus =x);
     }
   
     logout(){
      this.firebaseService.logOut();
     }

}
