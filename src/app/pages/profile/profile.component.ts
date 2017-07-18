import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService, OrganizationService, RoleService } from "app/_services/index";
import { User } from "app/_models/index";
import { CfToastComponent } from 'app/components/cf-toast/cf-toast.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { InlineEditorComponent } from 'ng2-inline-editor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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

  constructor( private userService: UserService,
    private orgService: OrganizationService,
    private roleService: RoleService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    try{
let db = JSON.parse(localStorage.data);
    this.fetchUser(db.username);
    }catch(e){
      this.addToast("Có lỗi trong quá trình xử lý",3000,"error");
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

}
