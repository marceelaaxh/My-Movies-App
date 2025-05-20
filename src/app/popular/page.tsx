// src/app/popular/page.tsx
'use client';

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getPopularMovies } from "@/services/movies/getPopularMovies";
import MovieList from "@/components/MovieList/MovieList";
import SectionNavigation from "@/components/SectionNavigation/SectionNavigation";

const PopularPage = () => {  
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      try {
        const data = await getPopularMovies(currentPage);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages)); 
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, [currentPage]);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Popular Movies</h3>

      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}

      {!loading && <MovieList movies={movies} origin="Popular" />}

      {!loading && movies.length > 0 && (
        <SectionNavigation
          page={currentPage}
          totalPages={totalPages}
          prev={`/popular?page=${currentPage - 1}`}
          next={`/popular?page=${currentPage + 1}`}
        />
      )}
    </div>
  );
};

export default PopularPage;