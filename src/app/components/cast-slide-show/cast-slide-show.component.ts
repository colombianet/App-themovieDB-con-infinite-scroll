import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { Cast } from 'src/app/models/cast-response';

import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slide-show',
  templateUrl: './cast-slide-show.component.html',
  styleUrls: ['./cast-slide-show.component.css']
})
export class CastSlideShowComponent implements OnInit, AfterViewInit {

  @Input() cast: Cast[];

  constructor() { }

  ngOnInit(): void {
    // por errores en la libreria Swiper, solo tomo 10 personajes de la pelicula
    this.cast = this.cast.slice(0, 10);
  }

  ngAfterViewInit(): void {
      const swiper = new Swiper('.swiper-container', {
        slidesPerView: 10,
        spaceBetween: 15,
        freeMode: true,
        direction: 'horizontal'
      });
  }

}
