'use client';

import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import MovieList from "@/components/MovieList/MovieList";
import SectionNavigation from "@/components/SectionNavigation/SectionNavigation";

const PopularClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Popular Movies</h3>

      {/* Indicador de carga */}
      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}

      {!loading && <MovieList movies={movies} origin="Popular" />}
      {!loading && movies.length > 0 && (
        <>
          <MovieList movies={movies} origin="Popular" />
          <SectionNavigation
            page={1}
            totalPages={4}
            prev="/my-favorites"  
            next="/now-playing"
          />
        </>
      )}
    </div>
  );
};

export default PopularClientPage;