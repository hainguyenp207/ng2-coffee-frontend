import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-page-internal-error',
  templateUrl: './page-internal-error.component.html',
  styleUrls: ['./page-internal-error.component.css']
})
export class PageInternalErrorComponent implements OnInit {
  returnUrl: string = "/"; // default home

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams["return_url"];
    if (!this.returnUrl) {
      this.returnUrl = "/";
    }
  }

}
