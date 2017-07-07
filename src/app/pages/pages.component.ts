import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  permissions = [];
  currentPermission: any = {}
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let data = localStorage.getItem("data");
    let permission = localStorage.getItem("active");
    if (data) {
      let dataJs = JSON.parse(data);
      let permissionJs = JSON.parse(permission);
      this.permissions = dataJs.permissions;
      this.currentPermission = permissionJs;
    } else {
      this.router.navigateByUrl("/login")
      //window.location.href = "/login";
    }
  }

}
