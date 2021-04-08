import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from '../../services/movies.service';

import { Movie } from '../../models/now-playing-response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  busqueda: string;
  movies: Movie[] = [];
  loading = false;

  constructor( private aRoute: ActivatedRoute, private movieSvc: MoviesService ) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe(params => {
      this.loading = true;
      this.busqueda = params.text;
      this.movieSvc.getMovies(this.busqueda).subscribe(resp => {
        this.movies = resp;
        this.loading = false;
      });
    });
  }

}
