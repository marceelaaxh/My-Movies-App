import api from "../api";

export const getNowPlaying = async (page = 1) => {
  try {
    const endpoint = `/movie/now_playing?language=en-US&region=US&page=${page}`;
    const res = await api.get(endpoint);
    return res.data;
  } catch (err: any) {
    console.error("Error loading now playing movies", err);
    return err.response?.data || {};
  }
};