export interface Movie {
  id: number;
  title: string;
  year: number | null;
  genre: string | null;
  description: string | null;
  poster_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateMoviePayload {
  title: string;
  year?: number;
  genre?: string;
  description?: string;
  poster_url?: string;
}
