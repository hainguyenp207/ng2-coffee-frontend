import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivityService } from 'app/_services/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Activity } from "app/_models/index";
import {BACKEND_IMG} from "app/_constants/config-envoriment"
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activities: any = [];
  permissions = [];
  currentPermission: any = {
    role: {
      id: null
    }
  }
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

  constructor(private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig) {
    let data = localStorage.getItem("data");
    let permission = localStorage.getItem("active");
    if (data) {
      let dataJs = JSON.parse(data);
      let permissionJs = JSON.parse(permission);
      this.permissions = dataJs.permissions;
      this.currentPermission = permissionJs;
      this.fetchActivities(0, 10);
    } else {
      this.router.navigateByUrl("/login");
    }
  }

  ngOnInit() {

  }
  fetchActivities(page: number, size: number) {
    if (this.isFullPermission()) {
      this.countActivity();
      this.activityService.getActivitiesPaging(page, size).subscribe(
        data => {
          this.activities = data.json();
        },
        error => {
          if (error.status == 401) {
            this.router.navigateByUrl("/login");
          }
        });
      this.activityService.countActivityConfirm().subscribe(
        data => {
          this.countActivities = data.json();
        },
        error => {
          if (error.status == 401) {
            this.router.navigateByUrl("/login");
          }
        });
    } else if (this.isStudent()) {
      this.router.navigateByUrl("pages/user/activities");
    }
    else {
      this.countActivityOrg(this.currentPermission.organization.id);
      this.activityService.getActivityByOrg(this.currentPermission.organization.id).subscribe(
        data => {
          this.activities = data.json();
        },
        error => {
          if (error.status == 401) {
            this.router.navigateByUrl("/login");
          }
        });
      this.activityService.countActivityOrgConfirm(this.currentPermission.organization.id).subscribe(
        data => {
          this.countActivities = data.json();
        },
        error => {
          if (error.status == 401) {
            this.router.navigateByUrl("/login");
          }
        });
    }
  }
  countActivity() {
    this.activityService.countActivity().subscribe(
      data => {
        this.paging.total = data.json();
      },
      error => {
        this.handleError(error);
      });
  }
  countActivityOrg(orgId: string) {
    this.activityService.countActivityOrg(orgId).subscribe(
      data => {
        this.paging.total = data.json();
      },
      error => {
        this.handleError(error);
      });
  }
  isStudent() {
    if (this.currentPermission.role.id === 'STUDENT'
      && this.currentPermission.organization.id === 'HCMUTE') {
      return true;
    } else
      return false;
  }
  isFullPermission() {
    if (this.currentPermission.role.id === 'ADMIN'
      && this.currentPermission.organization.id === 'HCMUTE') {
      return true;
    } else
      return false;
  }
  canDeleteActivity(isConfirmed) {
    return !isConfirmed;
  }
  canEditActivity(isConfirmed) {
    return !isConfirmed;
  }
  isRoleOrg() {
    if (this.currentPermission.role.id === 'CBD') {
      return true;
    } else
      return false;
  }
  getLinkEdit(activityId: string) {
    if (this.isFullPermission()) {
      return ['/pages/admin/activities/edit/' + activityId];
    }
    if (this.isRoleOrg()) {
      return ['/pages/cbd/activities/edit/' + activityId];
    }
    return ''
  }
  confirm(activity: any, confirm: boolean) {
    activity.confirmed = confirm;
    this.activityService.updateNoFile(activity).subscribe(
      data => {
        if (confirm)
          this.addToast(`Bạn đã phê duyệt hoạt động ${activity.name} thành công`, 10000, "success");
        else {
          this.addToast(`Bạn đã hủy phê duyệt hoạt động ${activity.name} thành công`, 10000, "success");
        }
      },
      error => {
        this.handleError(error);
      });
  }
  public showModal(activity: Activity): void {
    this.currentActivity = activity;
    this.orgModal.show();
  }
  public hideModal(): void {
    this.orgModal.hide();
  }
  getLinkImg(fileName: string) {
    return BACKEND_IMG + fileName;
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
  delete(idActivity: string) {
    this.activityService.delete(idActivity).subscribe(
      data => {
        this.addToast("Hoạt động đã được xóa thành công", 2000, "success");
        this.fetchActivities(0, 10);
      },
      error => {
        this.handleError(error);
      });
    this.hideModal();

  }
  getRouter() {
    this.isFullPermission() ? ['admin/activities/new'] : ['cbd/activities/new']
  }
  handleSuccess(data: any) {
    if (data.status === 204) {
      this.addToast("Hoạt động đã được xóa thành công", 2000, "success");
    } else {
      var json = data.json();
      if (json.code == 0) {
        this.addToast(json.message, 2000, "success");
      }
    }
    this.fetchActivities(this.paging.currentPage, this.paging.perPage);
  }
  handleError(error: any) {
    switch (error.status) {
      case 401: this.router.navigateByUrl("/login"); break;
      case 403: this.router.navigateByUrl("/error/403"); break;
      case 404: this.router.navigateByUrl("/error/404"); break;
      case 400: {
        let errorSV = error.json();
        errorSV.detail.forEach(element => {
          this.addToast(element.message, 5000, "error");
        });
      }; break;
      default: {
        try {
          let js = error.json();
          if (js.code) {
            this.addToast(js.message, 3000, "error");
          }
        } catch (e) {
          this.addToast("Có lỗi trong quá trình xử lý, vui lòng thử lại sau", 3000, "error");
        }
      }
    }
  }
  getPage(page: number) {
    this.paging.currentPage = page - 1;
    this.fetchActivities(page - 1, this.paging.perPage)
  }
  onChangeSearch(e) {
    setTimeout(() => {
      this.search(e.target.value, this.paging.currentPage, this.paging.perPage);
    }, 2000)
  }
  search(keyword: string, page: Number, size: Number) {
    if (!this.currentPermission.organization.id) {
      this.activityService.searchActivitiesInternal(keyword, page, size).subscribe(
        data => {
          this.activities = data.json();
        },
        error => {

        })
    }
    else {
      this.activityService.searchActivitiesByOrgInternal(this.currentPermission.organization.id, keyword, page, size).subscribe(
        data => {
          this.activities = data.json();
        },
        error => {

        })
    }

  }
}