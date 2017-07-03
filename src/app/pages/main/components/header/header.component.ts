import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private url: any = 'http://localhost:9002/#/login';
  private returnUrl: any = 'http://localhost:9000'
  private accessToken: any = '';
  private userName: any = '';
  constructor() { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('token');
    this.userName = localStorage.getItem('userName');
  }
  getLinkLogin() {
    return this.url + "?return_url=" + this.returnUrl;
  }

}
