<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Movie;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create sample movies
        Movie::create([
            'title' => 'The Epic Adventure',
            'poster_url' => 'https://picsum.photos/400/600?random=1',
            'synopsis' => 'An incredible journey through unknown lands filled with danger, mystery, and wonder. Join our heroes as they embark on the adventure of a lifetime to save their world from an ancient evil.',
            'trailer_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'slug' => 'the-epic-adventure'
        ]);

        Movie::create([
            'title' => 'Space Warriors: Galaxy Defense',
            'poster_url' => 'https://picsum.photos/400/600?random=2',
            'synopsis' => 'In the year 2085, humanity faces its greatest threat from beyond the stars. A team of elite space warriors must defend Earth against an alien invasion that threatens all life as we know it.',
            'trailer_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'slug' => 'space-warriors-galaxy-defense'
        ]);
    }
}
