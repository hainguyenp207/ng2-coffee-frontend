import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationService, ActivityService, RegisterService } from "app/_services/index";
import { Organization, Register, Activity } from "app/_models/index";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CfToastComponent } from 'app/components/cf-toast/cf-toast.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-point-management',
  templateUrl: './point-management.component.html',
  styleUrls: ['./point-management.component.css']
})
export class PointManagementComponent implements OnInit {

  registers: Array<Register> = [];
  data: any = {};
  point: any = {
    social: 0,
    tranning: 0
  };
  constructor(
    private orgService: OrganizationService,
    private registerService: RegisterService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.data = JSON.parse(localStorage.getItem("data"));
    this.fetchRegisterByUser(this.data.username);
  }

  ngOnInit() {
  }

  isEmpty() {
    return (this.registers.length === 0) ? true : false;
  }
  fetchRegisterByUser(userId: string) {
    this.registerService.getRegisterByUser(userId).subscribe(data => {
      this.registers = data.json();
      this.registers.forEach((register) => {
        this.point.social += register.pointSocial;
        this.point.tranning += register.pointTranning;
      })
    },
      error => {
        let dataJs = error.json();
        switch (error.status) {
          case 401: {
            this.addToast("Bạn chưa đăng nhập, vui long dang nhap lai", 2000, "error");
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
}
