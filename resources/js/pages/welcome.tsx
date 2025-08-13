import React, { useState } from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [showPreview, setShowPreview] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        poster_url: '',
        synopsis: '',
        trailer_url: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('movies.store'));
    };

    const handlePreview = () => {
        if (data.title) {
            setShowPreview(true);
        }
    };

    const getEmbedUrl = (url: string) => {
        if (!url) return '';
        
        // Convert YouTube watch URL to embed URL
        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1]?.split('&')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        
        // Handle youtu.be URLs
        if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        
        return url;
    };

    return (
        <>
            <Head title="🎬 Movie Page Builder - Create Stunning Movie Pages">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
                {/* Header */}
                <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">🎬</span>
                                <h1 className="text-xl font-bold text-white">Movie Page Builder</h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex space-x-2">
                                        <Link
                                            href={route('login')}
                                            className="text-white/80 hover:text-white px-4 py-2 transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {!showPreview ? (
                    /* Builder Interface */
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                🎬 Create Stunning Movie Pages
                            </h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Build beautiful, responsive movie detail pages with trailers, posters, and call-to-action buttons. 
                                Perfect for movie streaming sites, reviews, or promotional pages.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Form */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                <h3 className="text-2xl font-semibold text-white mb-6">🎯 Movie Details</h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            🎬 Movie Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Enter movie title..."
                                            required
                                        />
                                        {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            🖼️ Poster Image URL
                                        </label>
                                        <input
                                            type="url"
                                            value={data.poster_url}
                                            onChange={(e) => setData('poster_url', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="https://example.com/poster.jpg"
                                        />
                                        {errors.poster_url && <p className="text-red-400 text-sm mt-1">{errors.poster_url}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            📺 YouTube Trailer URL
                                        </label>
                                        <input
                                            type="url"
                                            value={data.trailer_url}
                                            onChange={(e) => setData('trailer_url', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="https://youtube.com/watch?v=..."
                                        />
                                        {errors.trailer_url && <p className="text-red-400 text-sm mt-1">{errors.trailer_url}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            📝 Movie Synopsis
                                        </label>
                                        <textarea
                                            value={data.synopsis}
                                            onChange={(e) => setData('synopsis', e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                            placeholder="Enter movie synopsis and description..."
                                        />
                                        {errors.synopsis && <p className="text-red-400 text-sm mt-1">{errors.synopsis}</p>}
                                    </div>

                                    <div className="flex space-x-4">
                                        <Button
                                            type="button"
                                            onClick={handlePreview}
                                            disabled={!data.title}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
                                        >
                                            👁️ Preview Page
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={processing || !data.title}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                                        >
                                            {processing ? '⏳ Creating...' : '🚀 Create & Save'}
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Features */}
                            <div className="space-y-6">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                    <h3 className="text-2xl font-semibold text-white mb-4">✨ Key Features</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <span className="text-2xl">📱</span>
                                            <div>
                                                <h4 className="font-semibold text-white">Fully Responsive</h4>
                                                <p className="text-gray-300">Perfect on desktop, tablet, and mobile devices</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <span className="text-2xl">🎬</span>
                                            <div>
                                                <h4 className="font-semibold text-white">YouTube Integration</h4>
                                                <p className="text-gray-300">Embed trailers directly from YouTube</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <span className="text-2xl">💰</span>
                                            <div>
                                                <h4 className="font-semibold text-white">Ad-Ready</h4>
                                                <p className="text-gray-300">Built-in Adstera ad placement areas</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <span className="text-2xl">⚡</span>
                                            <div>
                                                <h4 className="font-semibold text-white">Fast & Simple</h4>
                                                <p className="text-gray-300">No complex drag-and-drop, just fill and create</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
                                    <h3 className="text-2xl font-semibold text-white mb-4">🎯 Perfect For</h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li>• Movie streaming platforms</li>
                                        <li>• Film review websites</li>
                                        <li>• Cinema promotional pages</li>
                                        <li>• Independent filmmakers</li>
                                        <li>• Entertainment bloggers</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Preview Mode */
                    <div className="min-h-screen bg-gray-900">
                        {/* Preview Header */}
                        <div className="bg-black/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-white">📱 Preview Mode</h2>
                                    <Button
                                        onClick={() => setShowPreview(false)}
                                        className="bg-purple-600 hover:bg-purple-700 text-white"
                                    >
                                        ← Back to Editor
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Movie Page Preview */}
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            {/* Ad Placement Top */}
                            <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-4 mb-8 text-center">
                                <p className="text-gray-400">📺 Adstera Ad Placement - Top Banner</p>
                            </div>

                            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                                <div className="grid lg:grid-cols-3 gap-8 p-8">
                                    {/* Poster */}
                                    <div className="lg:col-span-1">
                                        {data.poster_url ? (
                                            <img
                                                src={data.poster_url}
                                                alt={data.title}
                                                className="w-full rounded-xl shadow-lg"
                                            />
                                        ) : (
                                            <div className="aspect-[2/3] bg-gray-700 rounded-xl flex items-center justify-center">
                                                <span className="text-6xl">🎬</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <h1 className="text-4xl font-bold text-white">{data.title}</h1>
                                        
                                        {data.synopsis && (
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-300 mb-2">Synopsis</h3>
                                                <p className="text-gray-400 leading-relaxed">{data.synopsis}</p>
                                            </div>
                                        )}

                                        {/* CTA Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors flex items-center justify-center space-x-2">
                                                <span>▶️</span>
                                                <span>Watch Now</span>
                                            </button>
                                            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors flex items-center justify-center space-x-2">
                                                <span>⬇️</span>
                                                <span>Download</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Trailer Section */}
                                {data.trailer_url && (
                                    <div className="p-8 pt-0">
                                        <h3 className="text-2xl font-semibold text-white mb-4">🎬 Watch Trailer</h3>
                                        <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden">
                                            <iframe
                                                src={getEmbedUrl(data.trailer_url)}
                                                title="Movie Trailer"
                                                className="w-full h-full"
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Ad Placement Bottom */}
                            <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-4 mt-8 text-center">
                                <p className="text-gray-400">💰 Adstera Ad Placement - Bottom Banner</p>
                            </div>

                            {/* Ad Placement Sidebar */}
                            <div className="grid lg:grid-cols-4 gap-6 mt-8">
                                <div className="lg:col-span-3">
                                    <div className="bg-gray-800 rounded-lg p-6">
                                        <h3 className="text-xl font-semibold text-white mb-4">Related Content</h3>
                                        <p className="text-gray-400">More movie content would appear here...</p>
                                    </div>
                                </div>
                                <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                                    <p className="text-gray-400 text-sm">📱 Adstera Sidebar Ads</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}