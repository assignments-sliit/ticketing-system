import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {

  constructor(private firebaseService: UserService) { }

  userStatus = this.firebaseService.userStatus;
  ngOnInit() {

    this.firebaseService.userChanges();

  }

}
