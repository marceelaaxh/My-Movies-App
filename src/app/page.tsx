'use client';

import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '@/services/movies/getTrendingMovies';
import { getSearchMovies } from '@/services/movies/getSearchMovies';
import { getPopularMovieVideos } from '@/services/movies/getPopularMovieVideos';
import MovieCarousel from '@/components/MovieCarousel/MovieCarousel';
import TrendingSwitch from '@/components/TrendingSwitch/TrendingSwitch';
import LatestTrailers from '@/components/LatestTrailers/LatestTrailers';
import Link from 'next/link';
import Image from 'next/image';

const HomePage = () => {
  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const res = await getTrendingMovies(timeWindow);
        setTrending(res.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [timeWindow]);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const res = await getPopularMovieVideos();
        console.log('Trailer response:', res);
  
        if (Array.isArray(res?.data)) {
          setTrailers(res.data);
        } else {
          console.warn('No trailers returned');
          setTrailers([]);
        }
      } catch (error) {
        console.error('Error fetching trailers:', error);
        setTrailers([]);
      }
    };
  
    fetchTrailers();
  }, []);
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }

      try {
        const res = await getSearchMovies(searchTerm);
        setSearchResults(res.results || []);
        setShowDropdown(true);
      } catch (error) {
        console.error('Error searching movies:', error);
        setSearchResults([]);
      }
    };

    const delay = setTimeout(fetchSearchResults);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  return (
    <main className="text-black min-h-screen">
      {/* Background + Search */}
      <section
        className="relative w-full h-[320px] bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/cinema-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-30 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow mb-2">
            Welcome to PelisMarce!
          </h1>
          <p className="text-lg sm:text-xl mb-4">
            Millions of movies to discover. Explore now.
          </p>

          <div className="w-full max-w-md relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a movie..."
              className="w-full px-4 py-2 rounded-full bg-white text-black focus:outline-none shadow"
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            {showDropdown && searchResults.length > 0 && (
              <ul className="absolute z-50 w-full bg-white text-black mt-2 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                {searchResults.map((movie) => (
                  <li key={movie.id} className="border-b border-gray-200 last:border-none">
                    <Link
                      href={`/movie/${movie.id}`}
                      className="flex items-center gap-4 p-2 hover:bg-gray-100"
                    >
                      {movie.poster_path && (
                        <Image
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          width={50}
                          height={75}
                          className="rounded-md object-cover"
                        />
                      )}
                      <span>
                        {movie.title}{' '}
                        <span className="text-gray-500 text-sm">
                          ({movie.release_date?.slice(0, 4) || 'No date'})
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Trending Movies */}
      <section className="px-6 pt-10">
        <div className="flex items-center gap-3 mb-2">
          <TrendingSwitch selected={timeWindow} onChange={setTimeWindow} />
        </div>
        {loading ? (
          <p className="text-center py-10 text-white">Loading movies...</p>
        ) : (
          <MovieCarousel movies={trending} variant="home" />
        )}
      </section>

      {/* Latesttrailers */}
      <LatestTrailers trailers={trailers} />
    </main>
  );
};

export default HomePage;