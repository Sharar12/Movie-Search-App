'use client';

import Link from 'next/link';
import type { Movie } from '../types';

interface Props {
  movie: Movie;
}

const PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" fill="%23374151"><rect width="300" height="450"/><text x="150" y="225" fill="%239ca3af" font-size="18" text-anchor="middle" dominant-baseline="middle">No Poster</text></svg>`
);

export default function MovieCard({ movie }: Props) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group block overflow-hidden rounded-xl border border-gray-700 bg-gray-800 transition-colors hover:border-yellow-600"
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-gray-700">
        <img
          src={movie.poster_url || PLACEHOLDER}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="truncate font-medium text-white">{movie.title}</h3>
        <p className="text-sm text-gray-400">
          {movie.year || '—'} {movie.genre && `· ${movie.genre}`}
        </p>
      </div>
    </Link>
  );
}
