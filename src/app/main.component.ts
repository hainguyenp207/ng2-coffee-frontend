import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { } from './pages/main/components/header/header.component'


@Component({
  selector: 'main-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
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

