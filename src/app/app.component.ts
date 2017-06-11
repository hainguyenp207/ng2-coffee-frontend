import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  authentication = {};
  data: any;
  isLoginPath: any = '';
  constructor(private route: ActivatedRoute) {
    console.log(route.url);
  }
  ngOnInit() {
  }

}

