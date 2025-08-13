<?php

use App\Models\Movie;

test('welcome page displays movie builder', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('welcome')
    );
});

test('can create movie', function () {
    $movieData = [
        'title' => 'Test Movie',
        'poster_url' => 'https://example.com/poster.jpg',
        'synopsis' => 'A test movie synopsis',
        'trailer_url' => 'https://youtube.com/watch?v=test123',
    ];

    $response = $this->post(route('movies.store'), $movieData);

    $this->assertDatabaseHas('movies', [
        'title' => 'Test Movie',
        'slug' => 'test-movie',
    ]);

    $movie = Movie::where('slug', 'test-movie')->first();
    $response->assertRedirect(route('movies.show', $movie->slug));
});

test('can view movie', function () {
    $movie = Movie::factory()->create();

    $response = $this->get(route('movies.show', $movie->slug));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('movies/show')
            ->has('movie')
            ->where('movie.title', $movie->title)
    );
});

test('can view movies index', function () {
    Movie::factory()->count(3)->create();

    $response = $this->get(route('movies.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('movies/index')
            ->has('movies.data', 3)
    );
});

test('movie validation requires title', function () {
    $response = $this->post(route('movies.store'), [
        'poster_url' => 'https://example.com/poster.jpg',
    ]);

    $response->assertSessionHasErrors(['title']);
});

test('movie slug is generated from title', function () {
    $this->post(route('movies.store'), [
        'title' => 'Amazing Movie Title',
    ]);

    $this->assertDatabaseHas('movies', [
        'title' => 'Amazing Movie Title',
        'slug' => 'amazing-movie-title',
    ]);
});