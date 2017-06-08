import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  permissions = [];
  currentPermission: any = {}
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    let data = localStorage.getItem("data");
    if (data) {
      let dataJs = JSON.parse(data);
      this.permissions = dataJs.permissions;
      this.currentPermission = dataJs.active;
      console.log(this.permissions);
      console.log(dataJs);
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
    console.log(data);
  }

}
