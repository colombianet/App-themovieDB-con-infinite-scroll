import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';

import { MoviesService } from '../../services/movies.service';

import { MovieDetailResponse } from '../../models/movie-detail-response';
import { Cast } from '../../models/cast-response';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  private id = '';
  movie: MovieDetailResponse;
  cast: Cast[] = [];

  constructor( private aRoute: ActivatedRoute, private movieSvc: MoviesService, private location: Location,
               private router: Router ) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe( params => {
      this.id = params.id;

      this.movieSvc.getCast(this.id).subscribe();
      // combino observables
      combineLatest([
        this.movieSvc.getMovieById( this.id ),
        this.movieSvc.getCast( this.id )
      ]).subscribe( ([movie, cast]) => {
        if ( !movie ) {
          this.router.navigateByUrl('/home');
          return;
        }
        this.movie = movie;

        this.cast = cast.filter( r => r.profile_path !== null );
      });

      // this.movieSvc.getMovieById( this.id ).subscribe( resp => {
      //   if ( !resp ) {
      //     this.router.navigateByUrl('/');
      //     return;
      //   }
      //   this.movie = resp;
      //   console.log(this.movie);
      // });

      // this.movieSvc.getCast( this.id ).subscribe( resp => {
      //   this.cast = resp.filter( r => r.profile_path !== null );
      //   console.log(this.cast);
      // });
    });
  }

  back(): void {
    this.location.back();
  }

}
