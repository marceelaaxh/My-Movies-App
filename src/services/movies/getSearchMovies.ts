import api from "../api";

export const getSearchMovies = async (query: string) => {
  try {
    const res = await api.get(`search/movie?query=${encodeURIComponent(query)}&language=en-US`);
    return res.data;
  } catch (err) {
    console.error("Search error:", err);
    return { results: [] };
  }
};