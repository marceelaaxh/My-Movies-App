import api from "../api";

export const getMovieVideos = async (movieId: number) => {
  try {
    const res = await api.get(`movie/${movieId}/videos?language=en-US`);
    return res.data.results || [];
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    return [];
  }
};
