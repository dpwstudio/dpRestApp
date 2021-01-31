import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-nclock',
  templateUrl: './date-nclock.component.html',
  styleUrls: ['./date-nclock.component.scss']
})
export class DateNClockComponent implements OnInit {
  date: string;

  constructor() { }

  ngOnInit(): void {
  }

  getCurrentDate(): any {
    setInterval(() => {
      this.date = moment().format('DD/MM/YYYY hh:mm:ss');
    }, 1000); // set it every one seconds
  }
}
