import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationService } from "app/_services/index";
import { Organization } from "app/_models/index";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CfToastComponent } from 'app/components/cf-toast/cf-toast.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {
  users = null;
  org: Organization = new Organization;
  orgs = null;
  roles: any = [];
  closeResult: string;
  rolesUser: any = [];
  dataRole: any = {};
  dataRoles: any = [];

  @ViewChild('orgModal') public orgModal: ModalDirective;

  constructor(
    private orgService: OrganizationService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.fetchOrg();
  }
  fetchOrg() {
    this.orgService.getAll().subscribe(
      data => {
        this.orgs = data.json();
      },
      error => {
        let dataJs = error.json();
        switch (error.status) {
          case 401: {
            this.addToast("Bạn chưa đăng nhập, vui long dang nhap lai", 10000, "error");
            setTimeout(() => {
              this.router.navigateByUrl("/login");
            }, 3000);
          } break;
          default:
            {
              this.addToast(dataJs.message, 10000, "error");
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

  public showModal(): void {
    this.org = new Organization;
    this.orgModal.show();
  }

  public showModalEdit(id: string, name: string, description: string): void {
    this.org = new Organization;
    this.org.id = id;
    this.org.name = name;
    this.org.description = description;
    this.orgModal.show();
  }

  public hideModal(): void {
    this.orgModal.hide();
  }

  getLinkEdit(id: string) {
    return '/users/edit/' + id;
  }
  collectData() {

  }
  save() {
    if (this.org.id) {
      this.updateOrg();
    } else {
      this.createOrg();
    }
  }
  createOrg() {
    this.orgService.create(this.org).subscribe(
      data => {
        this.addToast("Tổ chức đã được tạo thành công", 10000, "success");
        //this.hideModal();
        this.fetchOrg();
      },
      error => {
        let dataJs = error.json();
        if (error.status == 400) {
          if (dataJs.message) {
            dataJs.detail.foreach(error => {

            });
          }
        } else
          if (dataJs.message) {
            this.addToast(dataJs.message, 10000, "error");
          }
      });
  }
  updateOrg() {
    this.orgService.update(this.org).subscribe(
      data => {
        this.addToast("Thông tin tổ chức đã được cập nhập thành công", 10000, "success");
        //this.hideModal();
        this.fetchOrg();
      },
      error => {
        let dataJs = error.json();
        if (error.status == 400) {
          if (dataJs.message) {
            dataJs.detail.foreach(error => {

            });
          }
        } else
          if (dataJs.message) {
            this.addToast(dataJs.message, 2000, "error");
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
