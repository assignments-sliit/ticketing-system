import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-view-time-table',
  templateUrl: './view-time-table.page.html',
  styleUrls: ['./view-time-table.page.scss'],
})
export class ViewTimeTablePage implements OnInit {

  viewTitmeTableTitle: String = Constants.VIEW_TIME_TABLE_HOME_TITILE;
  constructor() { }

  ngOnInit() {
  }

}
