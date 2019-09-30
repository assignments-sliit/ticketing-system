import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { UserService } from "../../../services/user.service";
import { Constants } from 'src/app/constants/constants';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  imgsrc:string="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";

  public user_name: any;
  public user_email: any;
  public phone: any;
  public photo_URL: any;
  public UI: any;

  pages = [
    {
      title: 'Home',
      url: '/menu/users-home',
      icon: 'md-home'
    },
    {
      title: Constants.PROFILE,
      url: '/menu/profile',
      icon: 'md-person'
    },

    {
      title: 'TimeTable',
      url: '/menu/view-time-table',
      icon: 'md-clock'
    }
  ];

  selectedPath = "";

  constructor(private router: Router, private firebaseService: UserService, public storage: Storage, ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  userStatus = this.firebaseService.userStatus;
  ngOnInit() {



  }

  async getTheValue() {

    this.storage.get("users").then((val) => {
      if (val) {
        this.user_name = val.name;
        this.phone = val.phone;
        this.user_email = val.email;
        //this.photo_URL = val.photoURL;
        this.UI = val.id;
        if(val.photoURL){
          this.imgsrc=val.photoURL;
          console.log("urIMG"+val.photoURL);
        }else{
          this.imgsrc="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";

        }
        
        
        
      }else{
        this.imgsrc="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";

      }
    })

  }

  ionViewWillEnter() {
    this.firebaseService.userChanges();
    this.getTheValue();

    this.firebaseService.userStatusChanges.subscribe(x => this.userStatus = x);
  }

  logout() {
    this.firebaseService.logOut();
  }

}
