import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../_services/index';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activities: any = [];
  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.activityService.getAll().subscribe(
      data => {
        this.activities = data;
        console.log("Activities", data);
      },
      error => {
        console.log(error);
        if (error.status == 401) {
          console.log("Chua dang nhap");
        }
      });
  }
  

}
