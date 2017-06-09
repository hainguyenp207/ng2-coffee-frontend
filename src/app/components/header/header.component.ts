import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../../_services/sercurity/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  permissions = [];
  currentPermission: any = {}
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    let data = localStorage.getItem("data");
    if (data) {
      let dataJs = JSON.parse(data);
      this.permissions = dataJs.permissions;
      this.currentPermission = dataJs.active;
    }
  }
  setOrganization(organizationId: String) {
    let roleId = "";
    this.permissions.map((permission) => {
      if (permission.organization.id == organizationId)
        roleId = permission.role.id;
    });
    let data = {
      roleId: roleId,
      organizationId: organizationId
    }
    localStorage.setItem("active", JSON.stringify(data));
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl("/");
  }

}
