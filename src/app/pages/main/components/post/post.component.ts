import { Component, OnInit } from '@angular/core';

import { Activity } from 'app/_models/index';
import { ActivityService, OrganizationService, RegisterService } from 'app/_services/index';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { LoadingAnimateService } from 'ng2-loading-animate';
import * as moment from 'moment';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  active: any = {};
  typeComponent: any = {};
  authentication: any
  organizations: any = [];
  data: any = {};
  id: string;
  token: string;
  isRegistered: boolean;
  idUser: string;
  private sub: any;
  loadingSubmit: boolean = false;

  constructor(private activityService: ActivityService,
    private organizationService: OrganizationService,
    private registerService: RegisterService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private route: ActivatedRoute,
    private router: Router,
    private _loadingSvc: LoadingAnimateService) {
    this.toastyConfig.theme = 'material';
    this.idUser = localStorage.getItem("userId");
    this.token = localStorage.getItem("token");
    this.router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        this.sub = this.route.params.subscribe(params => {
          this.id = params['id'];
          this.fetchActivity(this.id);
          this.checkUserRegisteredActivity(this.id, this.idUser);
        });

      }
    });
  }

  ngOnInit() {
    this.data = {}

  }
  fetchActivity(id: string) {
    this.activityService.getById(id).subscribe(
      data => {
        let dataJs = data.json();
        if (data.status === 200) {
          this.data = dataJs;
          document.title = this.data.name + " - " + document.title;
        }
      },
      error => {
        switch (error.status) {
          case 401: {

          } break;
          case 404: {
          }
        }
      });
  }
  checkUserRegisteredActivity(idActivity: string, idUser: string) {
    this.registerService.checkRegisteredActivity(idActivity, idUser).subscribe(
      data => {
        let dataJs = data.json();
        if (data.status === 200) {
          this.isRegistered = dataJs;
        }
      },
      error => {
        switch (error.status) {
          case 401: {
          } break;
          case 404: {
          }
        }
      });
  }
  isLogged() {
    if (this.token && this.idUser)
      return true;
    return false;
  }
  register(id: any) {
    console.log(id);
  }
}
