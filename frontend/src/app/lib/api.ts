import type { Movie, CreateMoviePayload } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.message || `Request failed (${res.status})`, res.status);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export function getMovies(params?: { search?: string; genre?: string }): Promise<Movie[]> {
  const q = new URLSearchParams();
  if (params?.search) q.set('search', params.search);
  if (params?.genre) q.set('genre', params.genre);
  const qs = q.toString();
  return request<Movie[]>(`/movies${qs ? `?${qs}` : ''}`);
}

export function getMovie(id: number): Promise<Movie> {
  return request<Movie>(`/movies/${id}`);
}

export function createMovie(data: CreateMoviePayload): Promise<Movie> {
  return request<Movie>('/movies', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function deleteMovie(id: number): Promise<void> {
  return request<void>(`/movies/${id}`, { method: 'DELETE' });
}
