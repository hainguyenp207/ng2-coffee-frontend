import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../_services/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activities: any = [];
  constructor(private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router) {
    this.activityService.getAll().subscribe(
      data => {
        this.activities = data;
      },
      error => {
        if (error.status == 401) {
          this.router.navigateByUrl("/login");
        }
      });
  }

  ngOnInit() {

  }


}
