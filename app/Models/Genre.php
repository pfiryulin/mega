<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Book;

class Genre extends Model
{
    use HasFactory;

    public function book()
    {
        return $this->hasMany(Book::class, 'genre_id');
    }
}
