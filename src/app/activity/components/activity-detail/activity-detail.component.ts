import {
  OnInit,
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { Activity } from '../../../_models/index';
import { ActivityService, OrganizationService } from '../../../_services/index';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { LoadingAnimateService } from 'ng2-loading-animate';

import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
declare var tinymce: any;

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})

export class ActivityDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  active: any = {};
  typeComponent: any = {};
  editor;
  authentication: any
  organizations: any = [];
  data: any = {};
  hasFieldError: boolean = false;
  isSubmited: boolean = false;
  listFieldError: any = [];
  public daterange: any = {};
  id: string;
  private sub: any;
  loadingSubmit: boolean = false;

  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  public updateDateRange() {
    this.picker.datePicker.setStartDate('2017-03-27');
    this.picker.datePicker.setEndDate('2017-04-08');
  }

  constructor(private activityService: ActivityService,
    private organizationService: OrganizationService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private route: ActivatedRoute,
    private router: Router,
    private _loadingSvc: LoadingAnimateService
  ) {
    this.toastyConfig.theme = 'material';
  }

  ngOnInit() {
    this.active = JSON.parse(localStorage.getItem("active"));
    this.router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        if (val.url.includes("/activities/edit")) {
          this.typeComponent = "edit";
          this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.fetchActivity(this.id);
          });

        } else {
          this.typeComponent = "new";
        }
      }
    });

    // this.organizationService.getAll().subscribe(
    //   data => {
    //     this.organizations = data;
    //   },
    //   error => {
    //     if (error.status == 401) {
    //     }
    //   });
  }
  ngAfterViewInit() {
    tinymce.init({
      selector: '#description',
      plugins: ['link', 'paste', 'table'],
      skin_url: '../assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }


  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    timePicker: true,
    timePickerIncrement: 30,
    locale: { format: 'DD/MM/YYYY h:mm A' },
    alwaysShowCalendars: false,
    buttonClasses: ['btn', 'btn-sm'],
    applyClass: 'btn-default',
    cancelClass: 'btn-white'
  };

  public selectedDate(value: any) {
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }
  addToast(message, timeOut, type) {
    // Or create the instance of ToastOptions
    var toastOptions: ToastOptions = {
      title: "Thông báo",
      msg: message,
      showClose: true,
      timeout: timeOut,
      theme: 'material'
    };
    // Add see all possible types in one shot
    switch (type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }
  isLoading() {
    return this.isSubmited;
  }
  hasError(data, regex, type) {
    switch (type) {
      case "notblank": if (!data) return true; break;
      case "regex": return !regex.test(data);
    }
    return false;
  }
  hasErrorField(nameField) {
    return this.listFieldError.indexOf(nameField) == -1 ? false : true;
  }
  fetchActivity(id: string) {
    this.activityService.getById(id).subscribe(
      data => {
        let dataJs = data.json();
        if (data.status === 200) {
          this.data.id = dataJs.id;
          this.data.name = dataJs.name;
          this.data.description = dataJs.description;
          this.daterange.pointSocial = dataJs.pointSocial;
          this.daterange.pointTranning = dataJs.pointTranning;
          this.picker.datePicker.setStartDate(dataJs.startDate);
          this.picker.datePicker.setEndDate(dataJs.endDate);
        }
      },
      error => {
        switch (error.status) {
          case 401: {
            this.addToast("Bạn chưa đăng nhập, vui long dang nhap lai", 2000, "error");
            setTimeout(() => {
              this.router.navigateByUrl("/login");
            }, 3000);
          } break;
          case 404: {
            this.addToast("Không tìm thấy hoạt động", 200, "error");
            setTimeout(() => {
              this.router.navigateByUrl("/activities");
            }, 2000);
          }
        }
      });

  }
  createActivity(activity: Activity) {
    this.activityService.create(activity).subscribe(
      data => {
        let dataJS = data.json();
        if (data.status === 201) {
          this.addToast("Hoạt động đã được tạo", 2000, "success");
        } else
          if (dataJS.code != 0) {
            this.addToast(dataJS.message, 4000, "error");
          }
        this.isSubmited = false;
      },
      error => {
        if (error.status == 400) {
          let errorSV = error.json();
          errorSV.detail.forEach(element => {
            this.addToast(element.message, 5000, "error");
          });
        } else {
          let errorSV = error.json();
          if (errorSV) {
            if (errorSV.code) {
              let message = errorSV.message;
              this.addToast(message, 4000, "error");
            }
          }
        }
        this.isSubmited = false;
      })
  }
  updateActivity(activity: Activity, id: string) {
    activity.id = id;
    this.activityService.update(activity).subscribe(
      data => {
        let dataJS = data.json();
        if (data.status === 200) {
          this.addToast("Hoạt động đã được cập nhập", 2000, "success");
          this.fetchActivity(id);
        } else
          if (dataJS.code != 0) {
            this.addToast(dataJS.message, 4000, "error");
          }
        this.isSubmited = false;
      },
      error => {
        if (error.status == 400) {
          let errorSV = error.json();
          errorSV.detail.forEach(element => {
            this.addToast(element.message, 5000, "error");
          });
        } else {
          let errorSV = error.json();
          if (errorSV) {
            if (errorSV.code) {
              let message = "Mã lỗi: " + errorSV.code + " Chi tiết: " + errorSV.message;
              this.addToast(message, 4000, "error");
            }
          }
        }

        this.isSubmited = false;
      });
  }
  submitActivity() {
    let organizationId = localStorage.getItem("active");

    if (!this.daterange.start) {
      this.daterange.start = Date.now();
    }
    if (!this.daterange.end) {
      this.daterange.end = Date.now();
    }

    let activity: Activity = {
      name: this.data.name,
      description: this.editor.getContent(),
      startDate: this.daterange.start,
      endDate: this.daterange.end,
      organizationId: this.active.organizationId,
      activityTypeId: "1",
      pointTranning: this.data.pointTranning,
      pointSocial: this.data.pointSocial
    };
    let inputs = ["name"];


    this.hasFieldError = false;
    this.listFieldError = [];
    inputs.forEach(input => {
      if (this.hasError(activity[input], null, "notblank")) {
        this.listFieldError.push(input);
        this.hasFieldError = true;
      }
    })

    if (!this.hasFieldError) {
      this.isSubmited = true;
      if (this.typeComponent == "edit") {
        this.updateActivity(activity, this.id);
      } else if (this.typeComponent == "new") {
        this.createActivity(activity);
      }
    }
  }
}
