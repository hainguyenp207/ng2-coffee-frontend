import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService, OrganizationService, RoleService } from "app/_services/index";
import { User } from "app/_models/index";
import { CfToastComponent } from 'app/components/cf-toast/cf-toast.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { InlineEditorComponent } from 'ng2-inline-editor';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  users = null;
  user: any = {};
  orgs = null;
  roles: any = [];
  closeResult: string;
  rolesUser: any = [];
  dataRole: any = {};
  dataRoles: any = [];
  private sub: any;
  private id: any;
  constructor(
    private userService: UserService,
    private orgService: OrganizationService,
    private roleService: RoleService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        if (val.url.includes("/users/edit")) {
          this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.fetchUser(this.id);
          });

        } else {
          this.router.navigate(['/users']);
        }
      }
    });
  }

  ngOnInit() {
    this.orgService.getAll().subscribe(
      data => {
        this.orgs = data.json();
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

  updateUser(value) {
    this.editUser();
  }
  editUser() {
    var data = {
      username: this.user.username,
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      userOrgForm: this.dataRoles,
      facultyid: 'facultyid'
    }
    console.log(data);
    this.userService.update(data).subscribe(
      data => {
        if (data.status == 200) {
          this.addToast("Tài khoản đã được cập nhập thành công", 3000, "success")
        }
      },
      error => {
        if (error.status == 401) {
          console.log("Chua dang nhap");
        }
        let errorJs = error.json();
        if (errorJs.message) {
          this.addToast(errorJs.message, 2000, "error")
        }
      });
  }
  fetchUser(id: string) {
    this.userService.getById(id).subscribe(
      data => {
        this.user = data.json();
        this.user.permissions.forEach(permission => {
          let data = {
            organizationId: permission.organization.id,
            roleId: permission.role.id
          }
          this.dataRoles.push(data);
        });
      },
      error => {
        try {
          let errorSV = error.json();
          if (error.status == 404) {
            this.addToast("Tài khoản không tồn tại trong hệ thống", 4000, "error");
            setTimeout(() => {
              this.router.navigate(['/users']);
            }, 3000);
          } else
            if (errorSV) {
              if (errorSV.code) {
                let message = errorSV.message;
                this.addToast(message, 4000, "error");
              }
            }
        } catch (e) {
          this.addToast(e, 3000, "error")
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
    console.log(orgId)
    let orgSelected = this.orgs.filter(org => {
      return org.id === orgId;
    });
    console.log(orgSelected)
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

}
