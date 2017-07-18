import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs: Array<Object>;
  title: string = "";
  sub: any = "";
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        if (val.url.includes("/activities/new")) {
          this.title = "Quản lý hoạt động";
          this.sub = "Tạo mới"
        } else if (val.url.includes("/activities/points")) {
          this.title = "Điểm danh";
          this.sub = "Điểm danh"
        }
        else if (val.url.includes("/activities")) {
          this.title = "Quản lý hoạt động";
          this.sub = "Danh sách"
        }
        else if (val.url.includes("/users/new")) {
          this.title = "Tạo tài khoản";
          this.sub = "Tài khoản"
        }
        else if (val.url.includes("/users")) {
          this.title = "Quản lý tài khoản";
          this.sub = "Tài khoản"
        } else if (val.url.includes("/organizations")) {
          this.title = "Quản lý tổ chức";
          this.sub = "Tổ chức"
        }
        else if (val.url.includes("/profile")) {
          this.title = "Thông tin cá nhân";
          this.sub = "Tài khoản"
        }
      }
    });
  }

  ngOnInit() {
  }

}
