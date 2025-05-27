<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Reviews;
use App\Models\Book;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reviews>
 */
class ReviewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Reviews::class;

    public function definition(): array
    {

        return [
            'username' => $this->faker->name,
            'book_id' => Book::inRandomOrder()->first()->id,
            'rating' => $this->faker->numberBetween(1,5),
            'comment' => $this->faker->paragraph(rand(2, 5)),
        ];
    }
}
