import { Component, OnInit } from '@angular/core';
import { UserService, OrganizationService, RoleService } from "../../_services/index";
import { User } from "../../_models/index";
import { CfToastComponent } from '../../components/cf-toast/cf-toast.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  users = null;
  user: any = {};
  orgs = null;
  roles: any = [];
  closeResult: string;
  rolesUser: any = [];
  dataRole: any = {};
  dataRoles: any = [];
  permissions = [];
  currentPermission: any = {};
  i: Number = 0;
  paging: any = {
    currentPage: 0,
    total: 0,
    perPage: 10
  }
  constructor(
    private userService: UserService,
    private orgService: OrganizationService,
    private roleService: RoleService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    let data = localStorage.getItem("data");
    let permission = localStorage.getItem("active");
    if (data) {
      let dataJs = JSON.parse(data);
      let permissionJs = JSON.parse(permission);
      this.permissions = dataJs.permissions;
      this.currentPermission = permissionJs;
    } else {
      this.router.navigateByUrl("/login");
    }
  }

  countUser() {
    if (this.isFullPermission()) {
      this.userService.countUser().subscribe(
        data => {
          this.paging.total = data.json();
        },
        error => {
          this.handleError(error);
        });
    } else {
      this.userService.countUserOrg(this.currentPermission.organization.id).subscribe(
        data => {
          this.paging.total = data.json();
        },
        error => {
          this.handleError(error);
        });
    }

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
    this.countUser();
    this.fetchUser(0, 10);
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
  fetchUser(page: Number, perPage: Number) {
    if (this.isFullPermission()) {
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
    } else {
      this.userService.getUserByOrg(this.currentPermission.organization.id).subscribe(
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
    }
  }
  fetchUserOrg(orgId: string, page: Number, perPage: Number) {
    this.userService.getAll().subscribe(
      data => {
        this.users = data;
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
  }
  getPage(page: number) {
    this.paging.currentPage = page - 1;
    this.fetchUser(page - 1, this.paging.perPage)
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
  isFullPermission() {
    if (this.currentPermission.role.id === 'ADMIN'
      && this.currentPermission.organization.id === 'HCMUTE') {
      return true;
    } else
      return false;
  }
  isRoleOrg() {
    if (this.currentPermission.role.id === 'CBD') {
      return true;
    } else
      return false;
  }
  getLinkEdit(userId: string) {
    if (this.isFullPermission()) {
      return ['/pages/admin/activities/edit/' + userId];
    }
    if (this.isRoleOrg()) {
      return ['/pages/cbd/activities/edit/' + userId];
    }
    return ''
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

    this.dataRoles.push(this.dataRole);
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

