'use client';

import React, { useEffect, useState } from "react";
import { getTopRated } from "@/services/movies/getTopRated";
import MovieList from "@/components/MovieList/MovieList";
import { useRouter, useSearchParams } from "next/navigation";
import SectionNavigation from "@/components/SectionNavigation/SectionNavigation";

const TopRatedPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      try {
        const data = await getTopRated(currentPage);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages));
        console.log(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, [currentPage]);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Top Rated</h3>

      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}

      {!loading && <MovieList movies={movies} origin="Top-rated" />}

      {!loading && movies.length > 0 && (
        <SectionNavigation
          page={currentPage}
          totalPages={totalPages}
          prev={`/top-rated?page=${currentPage - 1}`}
          next={`/top-rated?page=${currentPage + 1}`}
        />
      )}
    </div>
  );
};

export default TopRatedPage;