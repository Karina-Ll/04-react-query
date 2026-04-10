import axios from 'axios';
import type { TmdbResponse } from '../types/movie';

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const movieInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: 'application/json',
  },
});

export const fetchMovies = async (query: string, page: number): Promise<TmdbResponse> => {
  const response = await movieInstance.get<TmdbResponse>('/search/movie', {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
  });
  return response.data;
};