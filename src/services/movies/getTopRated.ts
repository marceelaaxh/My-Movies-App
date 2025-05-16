// services/movies/getTopRated.ts
import api from "../api";

export const getTopRated = async (page = 1) => {
  try {
    const endpoint = `/movie/top_rated?language=en-US&region=US&page=${page}`;
    const res = await api.get(endpoint);
    return res.data;
  } catch (err: any) {
    console.error("Error loading top rated movies", err);
    return err.response?.data || {};
  }
};
