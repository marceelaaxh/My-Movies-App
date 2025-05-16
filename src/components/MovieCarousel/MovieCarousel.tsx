"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IMovieCarousel } from "@/types/MovieCarousel";

type Props = {
  movies: IMovieCarousel[];
  variant?: "default" | "home";
};

const getScoreColor = (score: number) => {
  if (score >= 7) return "border-green-500 text-green-400";
  if (score >= 5) return "border-yellow-500 text-yellow-400";
  return "border-red-500 text-red-400";
};

const MovieCarousel: React.FC<Props> = ({ movies, variant = "default" }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 w-max px-4 pb-6">
        {movies.map((movie) => {
          const score = Math.round(movie.vote_average);
          const scoreColor = getScoreColor(score);

          if (variant === "home") {
            let ratingLabel = "Poor rating";
            let labelColor = "text-red-500";

            if (score >= 7) {
              ratingLabel = "Highly rated";
              labelColor = "text-green-500";
            } else if (score >= 5) {
              ratingLabel = "Decent";
              labelColor = "text-yellow-500";
            }

            return (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="flex-shrink-0 min-w-[160px] max-w-[180px] flex flex-col"
              >
                <div className="flex flex-col items-start min-h-[340px] justify-between">
                  {/* Poster + Score circle */}
                  <div className="relative">
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      width={300}
                      height={450}
                      className="rounded-xl object-cover shadow-lg"
                    />
                    <div
                      className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 bg-black ${scoreColor} font-bold text-xs rounded-full flex items-center justify-center shadow-md border-2`}
                    >
                      {score}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-sm font-semibold text-black dark:text-white line-clamp-2">
                    {movie.title}
                  </h3>

                  {/* Textual score label */}
                  <p className={`text-xs mt-1 font-medium ${labelColor}`}>{ratingLabel}</p>
                </div>
              </Link>
            );
          }

          // Default versionnnn
          return (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="flex-shrink-0 w-32 sm:w-36 md:w-40"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-[160px] h-[240px]">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover rounded-xl shadow-lg"
                  />
                </div>
                <p className="mt-2 text-sm text-center text-gray-800 font-medium line-clamp-2">
                  {movie.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MovieCarousel;