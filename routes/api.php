<?php

use App\Http\Controllers\ReviewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\BookController;
use \App\Http\Controllers\BookControllerResurs;
use App\Http\Controllers\ReviewControllerResours;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Route::get('/books', [BookController::class, 'bookList']);
//Route::get('/books/{id}', [BookController::class, 'bookDetail']);
//Route::post('/books/{id}/reviews', [ReviewsController::class, 'store']);

Route::apiResource('books', \App\Http\Controllers\BookControllerResurs::class);
Route::post('/reviews', [ReviewControllerResours::class, 'store']);
