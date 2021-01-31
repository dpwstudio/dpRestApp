import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-nclock',
  templateUrl: './date-nclock.component.html',
  styleUrls: ['./date-nclock.component.scss']
})
export class DateNClockComponent implements OnInit {
  date: moment.Moment;
  hour: string;
  min: string;
  sec: string;

  constructor() { }

  ngOnInit(): void {
    this.date = moment();
    this.getCurrentDate();
  }

  getCurrentDate(): any {
    setInterval(() => {
      this.hour = moment().format('HH');
      this.min = moment().format('mm');
      this.sec = moment().format('ss');
    }, 1000); // set it every one seconds
  }
}
