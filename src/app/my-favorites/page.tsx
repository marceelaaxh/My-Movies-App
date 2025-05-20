// src/app/my-favorites/page.tsx
"use client";

import React, { Suspense, useEffect, useState } from "react";
import MovieList from "@/components/MovieList/MovieList";
import { getFavoriteMovies } from "@/services/accounts/getFavoriteMovies";
import { useGuestSession } from "@/providers/GuestSessionContext";
import SectionNavigation from "@/components/SectionNavigation/SectionNavigation";
import { useSearchParams } from "next/navigation";

const MyFavoritesPage = () => {
  const { guestSessionId } = useGuestSession();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");

  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!guestSessionId) return;
      setLoading(true);
      try {
        const data = await getFavoriteMovies(guestSessionId, page);
        setMovies(data?.results || []);
        setTotalPages(Math.min(data.total_pages));
      } catch (err) {
        console.error("Error loading favorite movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [guestSessionId, page]);

  return (
    <Suspense>
      <div>
        <h3 className="text-3xl font-bold mb-6">My Favorite Movies</h3>

        {loading && (
          <h5 className="text-lg text-gray-500">Loading favorites...</h5>
        )}

        {!loading && movies.length === 0 && (
          <div className="text-center mt-10 text-gray-600">
            <p className="text-xl">You don't have any favorite movies yet.</p>
            <p className="text-sm mt-2">
              Go to a movie's detail page and click "Add to Favorites" to see it
              here.
            </p>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <>
            <MovieList movies={movies} origin="Favorites" />
            <SectionNavigation
              page={page}
              totalPages={totalPages}
              prev={`/my-favorites?page=${page - 1}`}
              next={`/my-favorites?page=${page + 1}`}
            />
          </>
        )}
      </div>
    </Suspense>
  );
};

export default MyFavoritesPage;
