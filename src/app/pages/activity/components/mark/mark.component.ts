import { Component, OnInit } from '@angular/core';
import { ActivityService, RegisterService } from 'app/_services/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Register, Activity } from 'app/_models/index';
@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit {

  id: string;
  sub: any;
  registers: Array<{}> = new Array;
  loading: false;
  paging: any = {
    currentPage: 0,
    total: 0,
    perPage: 10
  }
  public activity: any = {};
  constructor(
    private activityService: ActivityService,
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
  ) {
    this.activity.name = "";
    this.router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        this.sub = this.route.params.subscribe(params => {
          this.id = params['idActivity'];
          this.fetchRegister(this.id);
          this.fetchActivity(this.id);
        });
      }
    });
  }

  ngOnInit() {
  }
  /**
   * Fetch registers
   */
  fetchRegister(idActivity: string) {
    this.registerService.getAll(idActivity).subscribe(
      data => {
        this.registers = data.json();
      },
      error => {
        switch (error.status) {
          case 401: this.router.navigateByUrl("/login");
          case 403: this.router.navigateByUrl("/error/403");
          case 404: this.router.navigateByUrl("/error/404");
          default: {
            try {
              let js = error.json();
              if (js.code) {
                this.addToast(js.message, 3000, "error");
              }
            } catch (e) {
              this.addToast(e, 3000, "error");
            }
          }
        }
      });
  }
  fetchActivity(id: string) {
    this.activityService.getById(id).subscribe(
      data => {
        let dataJs = data.json();
        if (data.status === 200) {
          this.activity = dataJs;
          console.log(this.activity)
        }
      },
      error => {
        switch (error.status) {
          case 401: {
            this.router.navigateByUrl("/login");
          } break;
          case 404: {
            this.addToast("Không tìm thấy hoạt động", 200, "error");
            setTimeout(() => {
              this.router.navigateByUrl("/pages/activities");
            }, 2000);
          }
        }
      });
  }
  onChangeJoined(e, idRegister: string, userId: string, joined: boolean, ) {
    this.updateRegister(idRegister, userId, e.target.checked);
  }
  updateRegister(idRegister: string, userId: string, joined: boolean
  ) {

    let reg = new Register();
    reg.id = idRegister;
    reg.joined = joined;
    reg.pointSocial = this.activity.pointSocial;
    reg.pointTranning = this.activity.pointTranning;
    reg.activityId = this.id;
    reg.userId = userId;
    console.log(reg)
    this.registerService.update(reg).subscribe(
      data => {
        this.addToast("Cập nhập thành công", 10000, "success");
      },
      error => {
        switch (error.status) {
          case 401: this.router.navigateByUrl("/login");
          case 403: this.router.navigateByUrl("/error/403");
          case 404: this.router.navigateByUrl("/error/404");
          default: {
            try {
              let js = error.json();
              if (js.code) {
                this.addToast(js.message, 3000, "error");
              }
            } catch (e) {
              this.addToast(e, 3000, "error");
            }
          }
        }
      });
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
      return "http://localhost:8081/files/" + fileName;
    return "http://localhost:8081/files/hcmute.png";
  }
}
