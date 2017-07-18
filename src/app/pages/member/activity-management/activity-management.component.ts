import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationService, ActivityService, RegisterService } from "app/_services/index";
import { Organization, Register, Activity } from "app/_models/index";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CfToastComponent } from 'app/components/cf-toast/cf-toast.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import {BACKEND_IMG} from "app/_constants/config-envoriment"

@Component({
  selector: 'app-activity-management',
  templateUrl: './activity-management.component.html',
  styleUrls: ['./activity-management.component.css']
})
export class ActivityManagementComponent implements OnInit {

  activities: any = [];
  registers: any = [];
  data: any = {};
  constructor(private orgService: OrganizationService,
    private registerService: RegisterService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private route: ActivatedRoute,
    private router: Router) {
    this.data = JSON.parse(localStorage.getItem("data"));
    this.fetchRegisterByUser(this.data.username);
  }

  ngOnInit() {
    // this.registerService.getRegisterByUser("admin").subscribe(
    //   data => {
    //     this.activities = data;
    //     console.log("Activities", data);
    //   },
    //   error => {
    //     console.log(error);
    //     if (error.status == 401) {
    //       console.log("Chua dang nhap");
    //     }
    //   });
  }
  fetchRegisterByUser(userId: string) {
    this.registerService.getRegisterByUser(userId).subscribe(data => {
      this.registers = data.json();
    },
      error => {
        let dataJs = error.json();
        switch (error.status) {
          case 401: {
            this.addToast("Bạn chưa đăng nhập, vui lòng đăng nhập lại", 2000, "error");
            setTimeout(() => {
              this.router.navigateByUrl("/login");
            }, 3000);
          } break;
          default:
            {
              this.addToast(dataJs.message, 2000, "error");
            }
        }
      })
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
  isEmpty() {
    return (this.registers.length === 0) ? true : false;
  }
  getLinkImg(fileName: string) {
    if (fileName)
      return BACKEND_IMG + fileName;
    return BACKEND_IMG+"hcmute.png";
  }
}
