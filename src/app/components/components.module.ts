import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PeliculasPosterGridComponent } from './peliculas-poster-grid/peliculas-poster-grid.component';
import { CastSlideShowComponent } from './cast-slide-show/cast-slide-show.component';
import { LoadingComponent } from './loading/loading.component';

import { PipesModule } from '../pipes/pipes.module';
import { RatingModule } from 'ng-starrating';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [NavbarComponent, CarouselComponent, PeliculasPosterGridComponent, CastSlideShowComponent, LoadingComponent],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    RatingModule,
    SwiperModule
  ],
  exports: [
    NavbarComponent,
    CarouselComponent,
    PeliculasPosterGridComponent,
    CastSlideShowComponent,
    LoadingComponent
  ]
})
export class ComponentsModule { }
