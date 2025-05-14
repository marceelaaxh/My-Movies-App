'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getNowPlaying } from "@/services/movies/getNowPlaying";
import MovieList from "@/components/MovieList/MovieList";
import SectionNavigation from "@/components/SectionNavigation/SectionNavigation";

const NowPlayingPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setLoading(true);
      try {
        const data = await getNowPlaying();
        setMovies(data.results);
        console.log(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchNowPlayingMovies();
  }, []);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Now Playing</h3>
      
      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}
      {!loading && <MovieList movies={movies} origin="Now-playing" />}
      <SectionNavigation
        page={2}
        totalPages={4}
        prev="/popular"
        next="/top-rated"
      />
    </div>
  );
};

export default NowPlayingPage;

