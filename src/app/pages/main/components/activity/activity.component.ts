import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivityService } from 'app/_services/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Activity } from "app/_models/index";

@Component({
  selector: 'main-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activities: any = [];
  permissions = [];
  currentPermission: any = {};
  currentActivity: any = {};
  countActivities: number = 0;
  count: number = 0;
  loading: false;
  paging: any = {
    currentPage: 0,
    total: 0,
    perPage: 10
  }
  @ViewChild('orgModal') public orgModal: ModalDirective;
  @Input() data: any;
  constructor(private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig) {
  }

  ngOnInit() {
    document.title = "HCMUTE - Trường Đại học Sư phạm Kỹ Thuật TP.HCMUTE"
  }
  getLinkImg(fileName: string) {
    if (fileName)
      return "https://backend-social.herokuapp.com/files/" + fileName;
    return "https://backend-social.herokuapp.com/files/hcmute.png";
  }


}
