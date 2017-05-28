import {
  OnInit,
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { ActivityService, OrganizationService } from '../../../_services/index';


import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
declare var tinymce: any;

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})

export class ActivityDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;
  activity: any = {};
  organizations: any = [];
  public daterange: any = {};

  constructor(private activityService: ActivityService,
    private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationService.getAll().subscribe(
      data => {
        this.organizations = data;
        console.log("organizations", data);
      },
      error => {
        console.log(error);
        if (error.status == 401) {
          console.log("Chua dang nhap");
        }
      });
  }
  ngAfterViewInit() {
    tinymce.init({
      selector: '#description',
      plugins: ['link', 'paste', 'table'],
      skin_url: '../assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    timePicker: true,
    timePickerIncrement: 30,
    locale: { format: 'DD/MM/YYYY h:mm A' },
    alwaysShowCalendars: false,
    buttonClasses: ['btn', 'btn-sm'],
    applyClass: 'btn-default',
    cancelClass: 'btn-white'
  };

  public selectedDate(value: any) {
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }
  createActivity() {
    this.activityService.create(this.activity).subscribe(
      data => {
        console.log(data);
      },
      error => {
        if (error.status == 401) {
          console.log("Chua dang nhap");
        }
      });
  }
  updateActivity() {
    this.activityService.update(this.activity).subscribe(
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
