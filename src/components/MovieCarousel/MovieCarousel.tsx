// src/components/MovieCarousel/MovieCarousel.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IMovieCarousel } from "@/types/MovieCarousel";

type Props = {
  movies: IMovieCarousel[];
};

const MovieCarousel = ({ movies }: Props) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 w-max px-1 pb-1">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="flex-shrink-0 w-32 sm:w-36 md:w-40"
          >
            <div className="flex flex-col items-center">
              <div className="w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  width={160}
                  height={240}
                  className="object-cover w-full h-auto"
                />
              </div>
              <p className="mt-2 text-sm text-center text-gray-800 font-medium line-clamp-2">
                {movie.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;