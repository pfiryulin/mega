<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Author;
use App\Models\Genre;
use App\Models\Reviews;

class Book extends Model
{
    use HasFactory;

    public function author()
    {
        return $this->beLongsTo(Author::class, 'author_id');
    }

    public function genre()
    {
        return $this->beLongsTo(Genre::class, 'genre_id');
    }

    public function reviews()
    {
        return $this->hasMany(Reviews::class, 'book_id');
    }
}
