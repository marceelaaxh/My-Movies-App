import api from '../api';
import { ITrailer } from '@/types/TrailerCarousel';

export const getPopularMovieVideos = async (): Promise<{ data: ITrailer[] } | any> => {
  let res: any;

  try {
    const { data: popularMoviesVideos } = await api.get('/movie/popular?language=en-US');
    const movies = popularMoviesVideos.results?.slice(0, 11) || [];

    const trailers: ITrailer[] = [];

    for (const movie of movies) {
      if (!movie?.id || typeof movie.id !== 'number') {
        continue;
      }

      console.log(`Fetching videos for: ${movie.title} (${movie.id})`);

      try {
        const response = await api.get(`/movie/${movie.id}/videos?language=en-US`);
        const videos = response.data?.results || [];

        console.log(`Videos for "${movie.title}":`, videos);

        const trailer = videos.find(
          (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
        );

        if (trailer) {
          trailers.push({
            id: trailer.id,
            movieId: movie.id,
            name: trailer.name,
            movieTitle: movie.title,
            published_at: trailer.published_at || movie.release_date || '',
            thumbnail: `https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`,
            youtubeUrl: `https://www.youtube.com/watch?v=${trailer.key}`,
          });
        } else {
          console.warn(`⚠️ No valid trailer found for ${movie.title}`);
        }
      } catch (videoErr: any) {
        console.error(`Error fetching videos for ${movie.title} (${movie.id})`, videoErr?.message);
      }
    }

    res = { data: trailers };
  } catch (error: any) {
    console.error('Error in getPopularMovieVideos:', error?.message);
    res = error.response;
  }

  return res;
};
