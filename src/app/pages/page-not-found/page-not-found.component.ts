import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  returnUrl: string = "/"; // default home
  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams["return_url"];
    console.log(this.returnUrl);
    if (!this.returnUrl) {
      this.returnUrl = "/";
    }

  }

}
