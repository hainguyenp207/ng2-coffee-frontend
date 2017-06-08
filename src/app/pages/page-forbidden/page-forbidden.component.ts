import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-page-forbidden',
  templateUrl: './page-forbidden.component.html',
  styleUrls: ['./page-forbidden.component.css']
})
export class PageForbiddenComponent implements OnInit {
  returnUrl: string = "/"; // default home
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams["return_url"];
    if (!this.returnUrl) {
      this.returnUrl = "/";
    }
  }

}
