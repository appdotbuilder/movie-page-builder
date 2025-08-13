<?php

namespace Database\Factories;

use App\Models\Movie;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Movie>
     */
    protected $model = Movie::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->words(random_int(2, 4), true);
        
        return [
            'title' => ucwords($title),
            'poster_url' => 'https://picsum.photos/400/600?random=' . random_int(1, 1000),
            'synopsis' => fake()->paragraphs(3, true),
            'trailer_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'slug' => Str::slug($title),
        ];
    }
}