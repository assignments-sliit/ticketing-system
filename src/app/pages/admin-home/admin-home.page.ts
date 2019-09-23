import { Component, OnInit } from '@angular/core';
import { Constants } from '../../constants/constants';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {

  adminHomeTitle:String=Constants.ADMIN_HOME_TITLE;
  constructor() { }

  ngOnInit() {
  }

}
