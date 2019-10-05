import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/constants';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-view-time-table',
  templateUrl: './view-time-table.page.html',
  styleUrls: ['./view-time-table.page.scss'],
})
export class ViewTimeTablePage implements OnInit {

  timeTable: any;
  timeTableClient: boolean = false;
  viewTitmeTableTitle: String = Constants.VIEW_TIME_TABLE_HOME_TITILE;
  constructor(
    public storage: Storage,
    public userService: UserService,
    public firestore: AngularFirestore,
    public router: Router,
    public modalController: ModalController) {
    this.timeTableClient = true;

    this.userService.view_timetable().subscribe((data: any[]) => {
      this.timeTable = data;
    });
  }

  ngOnInit() {

  }
}
