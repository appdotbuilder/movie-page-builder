import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Movie {
    id: number;
    title: string;
    poster_url: string | null;
    synopsis: string | null;
    slug: string;
    created_at: string;
}

interface PaginationLinks {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
}

interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
}

interface Props {
    movies: {
        data: Movie[];
        links: PaginationLinks;
        meta: PaginationMeta;
    };
    [key: string]: unknown;
}

export default function MoviesIndex({ movies }: Props) {
    return (
        <AppShell>
            <Head title="All Movies" />
            <div className="min-h-screen bg-gray-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">🎬 All Movies</h1>
                        <p className="text-xl text-gray-300">
                            Browse all created movie pages
                        </p>
                        <Link
                            href={route('home')}
                            className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            ➕ Create New Movie Page
                        </Link>
                    </div>

                    {movies.data.length === 0 ? (
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">🎬</span>
                            <h3 className="text-2xl font-semibold text-white mb-2">No movies yet</h3>
                            <p className="text-gray-400 mb-6">Create your first movie page to get started!</p>
                            <Link
                                href={route('home')}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                            >
                                Create Your First Movie
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {movies.data.map((movie) => (
                                <Link
                                    key={movie.id}
                                    href={route('movies.show', movie.slug)}
                                    className="group bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-colors"
                                >
                                    <div className="aspect-[2/3] bg-gray-700 relative overflow-hidden">
                                        {movie.poster_url ? (
                                            <img
                                                src={movie.poster_url}
                                                alt={movie.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-4xl">🎬</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                                            {movie.title}
                                        </h3>
                                        {movie.synopsis && (
                                            <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                                                {movie.synopsis}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}