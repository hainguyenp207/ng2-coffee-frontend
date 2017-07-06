import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  permissions = [];
  currentPermission: any = {}
  constructor(private router: Router, private route: ActivatedRoute) {
    let data = localStorage.getItem("data");
    let permission = localStorage.getItem("active");
    if (data) {
      let dataJs = JSON.parse(data);
      let permissionJs = JSON.parse(permission);
      this.permissions = dataJs.permissions;
      this.currentPermission = permissionJs;
    } else {
      console.log("Ko co data");
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
  }

}
