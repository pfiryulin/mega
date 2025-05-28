<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Book;

class Reviews extends Model
{
    use HasFactory;
    protected $fillable = [
        'username',
        'rating',
        'comment',
        'book_id',
    ];

    public function book()
    {
        return $this->beLongsTo(Book::class, 'book_id');
    }
}
