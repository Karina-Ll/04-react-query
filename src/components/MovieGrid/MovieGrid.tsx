import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item} onClick={() => onSelect(movie)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : 'https://via.placeholder.com/500x750?text=No+Poster'}
              alt={movie.title}
            />
            <div className={css.info}>
              <h3 className={css.title}>{movie.title}</h3>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}