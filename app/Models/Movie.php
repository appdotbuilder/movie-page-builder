<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * App\Models\Movie
 *
 * @property int $id
 * @property string $title
 * @property string|null $poster_url
 * @property string|null $synopsis
 * @property string|null $trailer_url
 * @property string $slug
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Movie newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Movie newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Movie query()
 * @method static \Illuminate\Database\Eloquent\Builder|Movie whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Movie whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Movie wherePosterUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Movie whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Movie whereSynopsis($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Movie whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Movie whereTrailerUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Movie whereUpdatedAt($value)
 * @method static \Database\Factories\MovieFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Movie extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'poster_url',
        'synopsis',
        'trailer_url',
        'slug',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($movie) {
            if (empty($movie->slug)) {
                $movie->slug = Str::slug($movie->title);
            }
        });

        static::updating(function ($movie) {
            if ($movie->isDirty('title')) {
                $movie->slug = Str::slug($movie->title);
            }
        });
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Get the YouTube embed URL from the trailer URL.
     */
    public function getEmbedUrlAttribute(): ?string
    {
        if (!$this->trailer_url) {
            return null;
        }

        // Convert YouTube watch URL to embed URL
        if (preg_match('/youtube\.com\/watch\?v=([^&]+)/', $this->trailer_url, $matches)) {
            return 'https://www.youtube.com/embed/' . $matches[1];
        }

        // Handle youtu.be URLs
        if (preg_match('/youtu\.be\/([^?]+)/', $this->trailer_url, $matches)) {
            return 'https://www.youtube.com/embed/' . $matches[1];
        }

        return $this->trailer_url;
    }
}