'use client';

import React, { useState, useEffect } from 'react';
import { ITrailer } from '@/types/TrailerCarousel';

interface Props {
  trailers: ITrailer[];
}

const LatestTrailers: React.FC<Props> = ({ trailers }) => {
  const [activeBackground, setActiveBackground] = useState<string | null>(null);

  useEffect(() => {
  }, [trailers]);

  return (
    <section className="relative px-6 pt-10 overflow-hidden">
      {/* latest trailers with dynamic backgroundddd! */}
      {activeBackground && (
        <div
          className="absolute inset-0 bg-center bg-cover opacity-40 z-0 transition-all duration-500"
          style={{ backgroundImage: `url(${activeBackground})` }}
        />
      )}
      <h2 className="text-2xl font-bold mb-4 relative z-10">🎬 Latest Trailers</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 relative z-10">
        {trailers.map((trailer) => (
          <a
            key={trailer.id}
            href={trailer.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[240px] max-w-[240px] flex-shrink-0 group"
            onMouseEnter={() => setActiveBackground(trailer.thumbnail)}
          >
            <div className="relative">
              <img
                src={trailer.thumbnail}
                alt={trailer.name || trailer.movieTitle}
                className="rounded-lg shadow"
              />
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-bold text-black">{trailer.movieTitle}</p>
              <p className="text-xs text-black">{trailer.name}</p>
              <p className="text-xs text-black mt-1">
                {trailer.published_at
                  ? new Date(trailer.published_at).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : ''}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default LatestTrailers;