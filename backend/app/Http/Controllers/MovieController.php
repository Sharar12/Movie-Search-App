<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function index(Request $request)
    {
        return Movie::search($request->query('search'))
            ->genre($request->query('genre'))
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'nullable|integer',
            'genre' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'poster_url' => 'nullable|url|max:500',
        ]);
        return Movie::create($validated);
    }

    public function show(Movie $movie) { return $movie; }

    public function destroy(Movie $movie) { $movie->delete(); return response()->noContent(); }
}
