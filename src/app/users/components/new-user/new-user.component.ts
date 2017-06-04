import { Component, OnInit } from '@angular/core';
import { UserService, OrganizationService, RoleService } from "../../../_services/index";
import { User } from "../../../_models/index";
import { CfToastComponent } from '../../../components/cf-toast/cf-toast.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  users = null;
  user: any = {};
  orgs = null;
  roles: any = [];
  closeResult: string;
  rolesUser: any = [];
  dataRole: any = {};
  dataRoles: any = [];
  constructor(
    private userService: UserService,
    private orgService: OrganizationService,
    private roleService: RoleService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      data => {
        this.users = data.json();
      },
      error => {
        let errorSV = error.json();
        if (errorSV) {
          if (errorSV.code) {
            let message = errorSV.message;
            this.addToast(message, 4000, "error");
          }
        }
        // if (error.status == 401) {
        //   setTimeout(() => {
        //     this.router.navigateByUrl("/login");
        //   }, 3000);
        // }
      });
    this.orgService.getAll().subscribe(
      data => {
        this.orgs = data;
        console.log("Org", data);
      },
      error => {
        let errorSV = error.json();
        if (errorSV) {
          if (errorSV.code) {
            let message = errorSV.message;
            this.addToast(message, 4000, "error");
          }
        }
        // if (error.status == 401) {
        //   setTimeout(() => {
        //     this.router.navigateByUrl("/login");
        //   }, 3000);
        // }
      });
    this.roleService.getAll().subscribe(
      data => {
        this.roles = data.json();
      },
      error => {
        let errorSV = error.json();
        if (errorSV) {
          if (errorSV.code) {
            let message = errorSV.message;
            this.addToast(message, 4000, "error");
          }
        }
        if (error.status == 401) {
          setTimeout(() => {
            this.router.navigateByUrl("/login");
          }, 3000);
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

  createUser() {
    this.userService.create(this.user).subscribe(
      data => {
        console.log(data);
      },
      error => {
        if (error.status == 401) {
          console.log("Chua dang nhap");
        }
      });
  }
  addRole() {
    let roleSelected = this.dataRole;

    this.dataRoles.push(roleSelected);
  }
  getRoleName(roleId: string) {
    let roleSelected = this.roles.filter(role => {
      return role["id"] === roleId;
    });
    return roleSelected[0].name;
  }
  getOrgName(orgId: string) {
    let orgSelected = this.orgs.filter(org => {
      return org["id"] === orgId;
    });
    return orgSelected[0].name;
  }

}
