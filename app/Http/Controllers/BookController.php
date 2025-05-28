<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public static function bookList()
    {
        $books = Book::with(['author', 'genre'])->get();
        return $books;
    }

    public static function bookDetail($id)
    {
        $book = Book::with(['author', 'genre'])->find($id);

        return $book;
    }
}
