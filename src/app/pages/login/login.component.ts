import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from 'app/_services/index';
import { User } from 'app/_models/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User;
  loading: boolean = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['return_url'] || '/';
  }
  login() {
    this.loading = true;
    this.authenticationService.login(this.user.username, this.user.password)
      .subscribe(
      data => {
        console.log("Return url", this.returnUrl);
        let token = localStorage.getItem("token");
        let dataUser = JSON.parse(localStorage.getItem("data"));
        if (this.returnUrl === "/") {
          this.router.navigate([this.returnUrl]);
        } else {
          window.location.href = this.returnUrl + "/#/?access_token=" + token + "&user_name=" + dataUser.name + "&user_id=" + dataUser.username;
        }

      },
      error => {
        let detail = error.json();
        if (detail)
          this.alertService.error(detail.message);
        else {
          this.alertService.error(error);
        }
        this.loading = false;
      });
  }

}
