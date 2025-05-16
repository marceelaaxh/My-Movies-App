import api from "../api";

export const getPopularMovies = async (page = 1) => {
  try {
    const endpoint = `/movie/popular?language=en-US&region=US&page=${page}`;
    const res = await api.get(endpoint);
    return res.data;
  } catch (err: any) {
    console.error("Error loading popular movies", err);
    return err.response?.data || {};
  }
};
