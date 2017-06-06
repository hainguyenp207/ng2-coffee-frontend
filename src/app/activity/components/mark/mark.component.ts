import { Component, OnInit } from '@angular/core';
import { ActivityService, RegisterService } from '../../../_services/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Register } from '../../../_models/index';
@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit {

  id: string;
  sub: any;
  registers: Array<{}>;
  constructor(
    private activityService: ActivityService,
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        this.sub = this.route.params.subscribe(params => {
          this.id = params['idActivity'];
          this.fetchRegister(this.id);
        });
      }
    });
  }

  ngOnInit() {
  }
  /**
   * Fetch register
   */
  fetchRegister(idActivity: string) {
    this.registerService.getAll(idActivity).subscribe(
      data => {
        this.registers = data.json();
        console.log("Activities", data);
      },
      error => {
        console.log(error);
        if (error.status == 401) {
          console.log("Chua dang nhap");
        }
      });
  }
  onChangeJoined(e, idRegister: string, userId: string, joined: boolean,
    pointSocial: number, pointTranning: number) {
    console.log(e.target.checked);
    this.updateRegister(idRegister, userId, e.target.checked, pointSocial, pointTranning);
  }
  updateRegister(idRegister: string, userId: string, joined: boolean,
    pointSocial: number, pointTranning: number

  ) {
    let reg = new Register();
    reg.id = idRegister;
    reg.joined = joined;
    reg.pointSocial = pointSocial;
    reg.pointTranning = pointTranning;
    reg.activityId = this.id;
    reg.userId = userId;
    this.registerService.update(reg).subscribe(
      data => {
        console.log("Cập nhập thành công")
      },
      error => {
        console.log(error);
      });
  }


}
