import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../constants/constants';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileTitle:String=Constants.PROFILE_TITLE;
  constructor() { }

  ngOnInit() {
  }

}
