<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'year', 'genre', 'description', 'poster_url'];

    public function scopeSearch($query, ?string $term)
    {
        if ($term) {
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', "%{$term}%")
                  ->orWhere('genre', 'like', "%{$term}%");
            });
        }
    }

    public function scopeGenre($query, ?string $genre)
    {
        if ($genre) {
            $query->where('genre', $genre);
        }
    }
}
