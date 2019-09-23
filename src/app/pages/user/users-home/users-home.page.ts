import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../constants/constants';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.page.html',
  styleUrls: ['./users-home.page.scss'],
})
export class UsersHomePage implements OnInit {

  userHomeTitle: String = Constants.USER_HOME_TITLE;

  constructor() { }

  ngOnInit() {
  }

}
