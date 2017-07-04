import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './pages/main/components/header/header.component'
import { SharedData } from './shared-data';


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
  constructor(private route: ActivatedRoute,
    private _router: Router,
    private _sharedData: SharedData) {
    // if (!this._router.registry.hasRoute("Child", MainComponent))
    //   _sharedData.data = this.data;
  }

  ngOnInit() {
  }
  onNotify(e: any) {
    this._sharedData.emitChange(e);
  }

}

