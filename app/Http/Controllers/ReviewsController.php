<?php

namespace App\Http\Controllers;

use App\Models\Reviews;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewsController extends Controller
{
    public static function store(Request $request, $id){

        $book = Book::find($id);
        if (!$book) {
            return response()->json(['error' => 'Book not found'], 404);
        }
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:50',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string',
            'book_id' => 'required|integer|exists:books,id',  // Проверка на существование book_id в таблице books
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $review = new Reviews([
            'username' => $request->username,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'book_id' => $id,
        ]);

        $review->save();
    }
}
