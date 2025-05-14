'use client';

import React, { useEffect, useState } from "react";
import { getTopRated } from "@/services/movies/getTopRated";
import MovieList from "@/components/MovieList/MovieList";
import { useRouter } from "next/navigation";
import SectionNavigation from "@/components/SectionNavigation/SectionNavigation";

const TopRatedPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      try {
        const data = await getTopRated();
        setMovies(data.results);
        console.log(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Top Rated</h3>
      
      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}
      {!loading && <MovieList movies={movies} origin="Top-rated" />}
      <SectionNavigation
        page={3}
        totalPages={4}
        prev="/now-playing"
        next="/my-favorites"
      />
    </div>
  );
};

export default TopRatedPage;
