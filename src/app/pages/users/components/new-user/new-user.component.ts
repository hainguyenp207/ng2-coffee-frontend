import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService, OrganizationService, RoleService } from "app/_services/index";
import { User } from "app/_models/index";
import { CfToastComponent } from "app/components/cf-toast/cf-toast.component";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit, OnChanges {
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
        if (this.isFullPermission())
          this.orgs = data.json();
        else
          this.orgs = [

            {
              id: this.currentPermission.organization.id,
              name: this.currentPermission.organization.name
            }

          ]
      },
      error => {
        let errorSV = error.json();
        if (errorSV) {
          if (errorSV.code) {
            let message = errorSV.message;
            this.addToast(message, 4000, "error");
          }
        }
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
  ngOnChanges(changes) {
    console.log(changes);
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
    var data = {
      username: this.user.username,
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      userOrgForm: this.dataRoles,
      facultyid: 'facultyid'
    }
    console.log(data);
    this.userService.create(data).subscribe(
      data => {
        if (data.status == 201) {
          this.addToast("Tài khoản đã được tạo thành công", 3000, "success")
        }
      },
      error => {
        if (error.status == 401) {
          this.addToast("Phiên làm việc hết hạn, vui lòng đăng nhập lại", 4000, "error");
        }
        if (error.status == 409) {
          let errorJs = error.json();
          this.addToast(errorJs.message, 2000, "error");
        }
      });
  }

  checkDulicateOrg(orgId: string) {
    let duplicate = false;
    this.dataRoles.forEach(orgRole => {
      if (orgRole.organizationId === orgId)
        duplicate = true
    });
    if (duplicate) {
      this.addToast("Tài khoản đã tồn tại vai trò trong tổ chức này", 3000, "error");
    }
    return duplicate;
  }
  addRole(selectedRole, selectedOrg) {
    let roleSelected = {
      roleId: selectedRole.value,
      organizationId: selectedOrg.value
    };
    let error = false;
    if (roleSelected.roleId == "") {
      this.addToast("Bạn chưa chọn vai trò ", 2000, "error");
      error = true;
    }
    if (roleSelected.organizationId == "") {
      this.addToast("Bạn chưa chọn Tổ chức", 2000, "error");
      error = true;
    }
    //console.log(this.checkDulicateOrg(roleSelected.orgId), error)
    if (!this.checkDulicateOrg(roleSelected.organizationId) && !error)
      this.dataRoles.push(roleSelected);
  }
  getRoleName(roleId: string) {
    let role = this.roles.filter(role => {
      return role.id === roleId;
    });
    return role[0].name;
  }
  getOrgName(orgId: string) {
    let orgSelected = this.orgs.filter(org => {
      return org.id === orgId;
    });
    return orgSelected[0].name;
  }
  trackByFn(index, item) {
    return index;
  }
  removeRole(index: number) {
    this.dataRoles.splice(index, 1);
  }
  redirect(pagename: string) {
    this.router.navigate(['/' + pagename]);
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
}
