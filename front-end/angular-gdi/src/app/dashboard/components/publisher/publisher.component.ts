import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styles: []
})
export class PublisherComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() {
  }

}
