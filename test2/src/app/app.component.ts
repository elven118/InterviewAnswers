import { Component } from '@angular/core';
import pageTemplates from './page-template.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test2';
  Object = Object;
  pageTemplates = pageTemplates;
}
