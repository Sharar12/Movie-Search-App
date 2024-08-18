import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Movie Search App</h1>
        <p className="mt-4 text-lg text-gray-400">Discover and search for your favorite movies</p>
        <Link href="/movies" className="mt-8 inline-block rounded-lg bg-yellow-600 px-6 py-3 font-medium text-white hover:bg-yellow-700 transition-colors">Search Movies</Link>
      </div>
    </div>
  );
}
