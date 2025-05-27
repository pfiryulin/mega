<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Reviews;
use Illuminate\Database\Seeder;
use \Database\Seeders\AuthorSeeder;
use \Database\Seeders\BookSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call(AuthorSeeder::class);
        $this->call(BookSeeder::class);
        $this->call(Reviews::class);
    }
}
