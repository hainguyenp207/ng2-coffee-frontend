import { Component, OnInit } from '@angular/core';
import { UserService, OrganizationService } from "../_services/index";
import { User } from "../_models/index";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  users = null;
  user: any = {};
  orgs = null;
  closeResult: string;
  constructor(
    private userService: UserService,
    private orgService: OrganizationService
  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      data => {
        this.users = data;
        console.log("Users", data);
      },
      error => {
        console.log(error);
        if (error.status == 401) {
          console.log("Chua dang nhap");
        }
      });
    this.orgService.getAll().subscribe(
      data => {
        this.users = data;
        console.log("Org", data);
      },
      error => {
        console.log(error);
        if (error.status == 401) {
          console.log("Chua dang nhap");
        }
      });
  }
  createUser() {
    this.userService.create(this.user).subscribe(
      data => {
        console.log(data);
      },
      error => {
        if (error.status == 401) {
          console.log("Chua dang nhap");
        }
      });
  }
}
