import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    console.log(id);
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`id ${id} is wrong`);
    }
    return movie;
  }

  deleteOne(id: number) {
    const data = this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== data.id);
  }

  createOne(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData) {
    this.getOne(id);
    this.movies = this.movies.map((movie) =>
      movie.id === id ? { ...movie, ...updateData } : movie,
    );
  }
}
