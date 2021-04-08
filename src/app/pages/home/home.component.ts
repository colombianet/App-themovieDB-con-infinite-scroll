import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { Movie } from 'src/app/models/now-playing-response';

import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  moviesCarousel: Movie[] = [];
  moviesGrid: Movie[] = [];

  @HostListener('window:scroll')
  onwindowscrroll(): void {
    // espacio de gracias de 1300 para que cargue las siguientes peliculas antes de llegar al final del scroll
    const position = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const heightScreen = document.documentElement.scrollHeight || document.body.scrollHeight;

    if ( position > heightScreen ) {
      // esta verificacion se hace para prevenir multiples llamadas al servicio mientras se hace scroll
      if ( this.moviesSvc.loading ) {
        return;
      }

      this.moviesSvc.getNowPlaying().subscribe( resp => {
        // se van anexando las nuevas peliculas a las que ya estaban
        this.moviesGrid.push(...resp);
      });
    }
  }


  constructor( private moviesSvc: MoviesService ) { }

  ngOnDestroy(): void {
    // esto se hace para que el carousel cargue siempre las mismas peliculas ya q si se llamaron mas peliculas
    // haciendo scroll, el paramPages del servicio ha aumentado
    this.moviesSvc.resetParamPages();
  }

  ngOnInit(): void {
    this.moviesSvc.getNowPlaying().subscribe( resp => {
      // las peliculas del carousel son fijas y las otras puedenm variar con el infinte scroll
      this.moviesCarousel = resp;
      this.moviesGrid = resp;
    });
  }

}
