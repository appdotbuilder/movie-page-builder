import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Movie {
    id: number;
    title: string;
    poster_url: string | null;
    synopsis: string | null;
    trailer_url: string | null;
    slug: string;
    embed_url: string | null;
}

interface Props {
    movie: Movie;
    [key: string]: unknown;
}

export default function MovieShow({ movie }: Props) {
    return (
        <>
            <Head title={movie.title} />
            <div className="min-h-screen bg-gray-900">
                {/* Header Navigation */}
                <header className="bg-black/50 backdrop-blur-sm border-b border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <Link
                                href={route('home')}
                                className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors"
                            >
                                <span className="text-xl">🎬</span>
                                <span className="font-semibold">Movie Builder</span>
                            </Link>
                            <div className="flex space-x-4">
                                <Link
                                    href={route('movies.index')}
                                    className="text-white/80 hover:text-white px-4 py-2 transition-colors"
                                >
                                    All Movies
                                </Link>
                                <Link
                                    href={route('home')}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Create New
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Ad Placement Top */}
                    <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-8 mb-8 text-center">
                        <div className="space-y-2">
                            <p className="text-gray-400 font-medium">📺 Adstera Ad Placement</p>
                            <p className="text-gray-500 text-sm">Top Banner - 728x90 or Responsive</p>
                        </div>
                    </div>

                    {/* Main Movie Content */}
                    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl mb-8">
                        <div className="grid lg:grid-cols-3 gap-8 p-8">
                            {/* Movie Poster */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-8">
                                    {movie.poster_url ? (
                                        <img
                                            src={movie.poster_url}
                                            alt={movie.title}
                                            className="w-full rounded-xl shadow-lg"
                                        />
                                    ) : (
                                        <div className="aspect-[2/3] bg-gray-700 rounded-xl flex items-center justify-center">
                                            <span className="text-6xl">🎬</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Movie Details */}
                            <div className="lg:col-span-2 space-y-6">
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                                        {movie.title}
                                    </h1>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg">
                                        <span className="text-xl">▶️</span>
                                        <span className="text-lg">Watch Now</span>
                                    </button>
                                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg">
                                        <span className="text-xl">⬇️</span>
                                        <span className="text-lg">Download</span>
                                    </button>
                                </div>

                                {movie.synopsis && (
                                    <div>
                                        <h3 className="text-2xl font-semibold text-gray-300 mb-4">📖 Synopsis</h3>
                                        <p className="text-gray-400 leading-relaxed text-lg">
                                            {movie.synopsis}
                                        </p>
                                    </div>
                                )}

                                {/* Movie Info */}
                                <div className="bg-gray-700/50 rounded-xl p-6">
                                    <h3 className="text-xl font-semibold text-white mb-4">ℹ️ Movie Information</h3>
                                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-400">Genre:</span>
                                            <span className="text-white ml-2">Action, Adventure</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Duration:</span>
                                            <span className="text-white ml-2">2h 30min</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Rating:</span>
                                            <span className="text-white ml-2">⭐ 8.5/10</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Year:</span>
                                            <span className="text-white ml-2">2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trailer Section */}
                        {movie.embed_url && (
                            <div className="border-t border-gray-700 p-8">
                                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                                    <span className="mr-2">🎬</span>
                                    Watch Trailer
                                </h3>
                                <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                                    <iframe
                                        src={movie.embed_url}
                                        title={`${movie.title} Trailer`}
                                        className="w-full h-full"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Section with Ads */}
                    <div className="grid lg:grid-cols-4 gap-6">
                        {/* Related Content Area */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Comments Section */}
                            <div className="bg-gray-800 rounded-xl p-6">
                                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                                    <span className="mr-2">💬</span>
                                    Reviews & Comments
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-gray-700/50 rounded-lg p-4">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm">👤</span>
                                            </div>
                                            <span className="font-semibold text-white">Movie Fan</span>
                                            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                                        </div>
                                        <p className="text-gray-300">
                                            Amazing movie! Great storyline and fantastic visuals. Highly recommended!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Ad Placement Bottom */}
                            <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                                <div className="space-y-2">
                                    <p className="text-gray-400 font-medium">💰 Adstera Ad Placement</p>
                                    <p className="text-gray-500 text-sm">Bottom Content Banner - 728x90 or Responsive</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Ads */}
                        <div className="space-y-6">
                            <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                                <div className="space-y-2">
                                    <p className="text-gray-400 font-medium text-sm">📱 Adstera</p>
                                    <p className="text-gray-500 text-xs">Sidebar Ad 300x250</p>
                                </div>
                            </div>

                            <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                                <div className="space-y-2">
                                    <p className="text-gray-400 font-medium text-sm">📱 Adstera</p>
                                    <p className="text-gray-500 text-xs">Sidebar Ad 300x600</p>
                                </div>
                            </div>

                            {/* Related Movies */}
                            <div className="bg-gray-800 rounded-lg p-4">
                                <h4 className="font-semibold text-white mb-3">🎬 Related Movies</h4>
                                <div className="space-y-3">
                                    <div className="bg-gray-700/50 rounded-lg p-3">
                                        <p className="text-sm text-white font-medium">Action Movie 1</p>
                                        <p className="text-xs text-gray-400">⭐ 8.2/10</p>
                                    </div>
                                    <div className="bg-gray-700/50 rounded-lg p-3">
                                        <p className="text-sm text-white font-medium">Adventure Film 2</p>
                                        <p className="text-xs text-gray-400">⭐ 7.9/10</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Ad Placement */}
                    <div className="lg:hidden mt-8">
                        <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                            <div className="space-y-2">
                                <p className="text-gray-400 font-medium">📱 Adstera Mobile Ad</p>
                                <p className="text-gray-500 text-sm">Mobile Banner - 320x50 or Responsive</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}