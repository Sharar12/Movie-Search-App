'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Movie } from '../types';
import { getMovies } from '../lib/api';
import MovieCard from '../components/MovieCard';
import AddMovieModal from '../components/AddMovieModal';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMovies({ search: search.trim() || undefined });
      setMovies(data);
    } catch {} finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies, refreshKey]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') fetchMovies();
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-white">Movie Search</h1>

        <div className="mb-8 flex gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search movies by title or genre..."
            className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-yellow-500"
          />
          <button
            onClick={fetchMovies}
            className="rounded-lg bg-yellow-600 px-5 py-3 font-medium text-white hover:bg-yellow-700 transition-colors"
          >
            Search
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-lg bg-gray-700 px-5 py-3 font-medium text-white hover:bg-gray-600 transition-colors"
          >
            + Add
          </button>
        </div>

        {loading ? (
          <p className="py-12 text-center text-gray-400">Searching...</p>
        ) : movies.length === 0 ? (
          <p className="py-12 text-center text-gray-500">
            No movies found. {!search.trim() ? 'Add a movie to get started!' : 'Try a different search term.'}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      <AddMovieModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  );
}
