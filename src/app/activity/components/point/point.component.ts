import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../_services/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent implements OnInit {
  activities: any = [];
  constructor(private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

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
