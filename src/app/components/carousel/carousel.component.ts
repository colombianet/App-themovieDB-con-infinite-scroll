import { Component, Input, OnInit } from '@angular/core';

import { Movie } from 'src/app/models/now-playing-response';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() movies: Movie[];

  constructor() { }

  ngOnInit(): void {
  }

}
