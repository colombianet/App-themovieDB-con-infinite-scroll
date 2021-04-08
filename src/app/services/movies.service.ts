import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MovieDetailResponse } from '../models/movie-detail-response';
import { NowPlayingResponse, Movie } from '../models/now-playing-response';
import { CastResponse, Cast } from '../models/cast-response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl = 'https://api.themoviedb.org/3';
  // parametro usado para llamar el siguiente listado de peliculas (con el infinite scroll)
  private paramPage = 1;
  // variable usada para evitar muchas llamadas al sercicio al hacer scroll
  public loading = false;

  constructor( private http: HttpClient ) { }

  get params() {
    return {
      api_key: '47f2f529c7b926f10db86c2f63534b82',
      language: 'es-ES',
      page: this.paramPage.toString()
    };
  }

  // devuelve las peliculas que estan en cartelera
  getNowPlaying(): Observable<Movie[]> {

    if ( this.loading ) {
      return of([]);
    }

    this.loading = true;
    return this.http.get<NowPlayingResponse>(`${ this.baseUrl }/movie/now_playing?`, { params: this.params })
      .pipe(
        map( (resp) => {
          return resp.results;
        }),
        tap( () => {
          // cuando hizo la emision, aumenta el parametro y asi en la sgte llamada, trae las siguiente peliculas
          this.paramPage += 1;
          // al hacer esto, quiere decir que se pueden hacer la solicitud para nuevas peliculas
          this.loading = false;
        })
      );
  }

  // Para el buscador de peliculas
  getMovies( texto: string ): Observable<Movie[]> {
    // este endpoint necesita el param query y dependiendo la busqueda, devuelve el 1er listado de peliculas
    const params = {...this.params, page: '1', query: texto};
    return this.http.get<NowPlayingResponse>(`${ this.baseUrl }/search/movie`, { params })
      .pipe(
        map( (resp) => {
          return resp.results;
        })
      );
  }

  getMovieById( id: string ): Observable<MovieDetailResponse> {
    return this.http.get<MovieDetailResponse>(`${ this.baseUrl }/movie/${ id }`, { params: this.params })
      .pipe(
        catchError( (err) => {
          console.log(err);
          return of(null);
        })
      );
  }

  getCast( id: string ): Observable<Cast[]> {
    return this.http.get<CastResponse>(`${ this.baseUrl }/movie/${ id }/credits`, { params: this.params })
      .pipe(
        map( resp => {
          return resp.cast;
        }),
        catchError( (err) => {
          console.log(err);
          return of([]);
        })
      );
  }

  // AL cambiar de pagina y volver el carousel cargara siempre las mismas peliculas
  resetParamPages(): void {
    this.paramPage = 1;
  }
}
