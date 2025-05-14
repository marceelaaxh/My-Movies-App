// src/services/accounts/getFavoriteMovies.ts
import api from "../api";

export const getFavoriteMovies = async (guestSessionId: string, page = 1) => {
  try {
    const { data } = await api.get(
      `/account/${guestSessionId}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`
    );
    return data;
  } catch (error) {
    throw error;
  }
};