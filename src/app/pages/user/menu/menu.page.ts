import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages =[
    {
      title:'Profile',
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

    constructor(private router:Router,private firebaseService:UserService) {
      this.router.events.subscribe((event:RouterEvent)=>{
           this.selectedPath=event.url;
      });
     }

     userStatus=this.firebaseService.userStatus;
     ngOnInit() {

     
       this.firebaseService.userChanges();
       
      this.firebaseService.userStatusChanges.subscribe(x =>this.userStatus =x);
     }
   
     logout(){
      this.firebaseService.logOut();
     }

}
