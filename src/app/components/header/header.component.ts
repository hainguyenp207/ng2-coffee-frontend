import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  permissions = [];
  constructor() { }

  ngOnInit() {
    let data = localStorage.getItem("data");
    if (data) {
      let dataJs = JSON.parse(data);
      this.permissions = dataJs.permissions;
      console.log(this.permissions);
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
