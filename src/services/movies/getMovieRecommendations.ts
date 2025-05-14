// src/services/movies/getMovieRecommendations.ts
import api from "@/services/api";

export const getMovieRecommendations = async (movieId: string) => {
  const response = await api.get(`/movie/${movieId}/recommendations`);
  return response.data;
};
