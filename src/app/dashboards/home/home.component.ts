import { Component, OnInit } from '@angular/core';
import { Subscription, timer, BehaviorSubject } from 'rxjs';

import { LayoutService } from '../../layouts/layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
  }

}
