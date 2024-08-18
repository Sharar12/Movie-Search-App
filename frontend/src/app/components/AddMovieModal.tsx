'use client';

import { useState } from 'react';
import { createMovie } from '../lib/api';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function AddMovieModal({ open, onClose, onCreated }: Props) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!title.trim()) { setError('Title is required'); return; }
    try {
      setLoading(true);
      await createMovie({
        title: title.trim(),
        year: year ? parseInt(year, 10) : undefined,
        genre: genre.trim() || undefined,
        description: description.trim() || undefined,
        poster_url: posterUrl.trim() || undefined,
      });
      setTitle(''); setYear(''); setGenre(''); setDescription(''); setPosterUrl('');
      onCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save movie');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-800 p-6">
        <h2 className="mb-5 text-xl font-bold text-white">Add Movie</h2>
        <div className="space-y-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title *" className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-yellow-500" />
          <div className="flex gap-3">
            <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" type="number" className="w-1/2 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-yellow-500" />
            <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" className="w-1/2 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-yellow-500" />
          </div>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)" rows={3} className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-yellow-500" />
          <input value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} placeholder="Poster URL (optional)" className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-yellow-500" />
        </div>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        <div className="mt-5 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-lg bg-gray-700 py-2.5 text-sm text-gray-300 hover:bg-gray-600 transition-colors">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 rounded-lg bg-yellow-600 py-2.5 text-sm font-medium text-white hover:bg-yellow-700 transition-colors disabled:opacity-50">{loading ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}
