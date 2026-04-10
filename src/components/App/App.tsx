import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import Pagination from '../Pagination/Pagination';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim() !== '',
    retry: 1,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() === '') {
      toast.error('Будь ласка, введіть текст для пошуку!');
      return;
    }
    setQuery(newQuery);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.container}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {isError && <ErrorMessage />}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data && data.results.length > 0 && (
            <>
              <MovieGrid
                movies={data.results}
                onSelect={(movie) => setSelectedMovie(movie)}
              />

              {totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={totalPages > 500 ? 500 : totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}

          {query && data?.results.length === 0 && (
            <p>Нічого не знайдено за запитом &ldquo;{query}&rdquo;</p>
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}