'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Movie } from '../../types';
import { getMovie, deleteMovie } from '../../lib/api';

const PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" fill="%23374151"><rect width="300" height="450"/><text x="150" y="225" fill="%239ca3af" font-size="18" text-anchor="middle" dominant-baseline="middle">No Poster</text></svg>`
);

export default function MovieDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!params?.id) return;
    getMovie(Number(params.id))
      .then(setMovie)
      .catch(() => setError('Failed to load movie'))
      .finally(() => setLoading(false));
  }, [params?.id]);

  async function handleDelete() {
    if (!movie || !confirm('Delete this movie?')) return;
    try {
      await deleteMovie(movie.id);
      router.push('/movies');
    } catch {
      setError('Failed to delete movie');
    }
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-gray-900"><p className="text-gray-400">Loading...</p></div>;
  if (error || !movie) return <div className="flex min-h-screen items-center justify-center bg-gray-900"><p className="text-red-400">{error || 'Movie not found'}</p></div>;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <button
          onClick={() => router.push('/movies')}
          className="mb-6 text-sm text-gray-400 hover:text-white transition-colors"
        >
          &larr; Back to Search
        </button>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="shrink-0">
            <img
              src={movie.poster_url || PLACEHOLDER}
              alt={movie.title}
              className="w-full max-w-xs rounded-xl object-cover shadow-2xl md:w-64"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
            {movie.year && <p className="mt-1 text-lg text-gray-400">{movie.year}</p>}

            {movie.genre && (
              <span className="mt-3 inline-block rounded-full bg-yellow-900/50 px-3 py-1 text-sm text-yellow-400">
                {movie.genre}
              </span>
            )}

            {movie.description && (
              <p className="mt-5 leading-relaxed text-gray-300">{movie.description}</p>
            )}

            <div className="mt-8 flex gap-3">
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-900/50 px-5 py-2.5 text-sm text-red-400 hover:bg-red-800/50 transition-colors"
              >
                Delete Movie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
