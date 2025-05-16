import api from "../api";

export const getTrendingMovies = async (timeWindow: "day" | "week") => {
  let res: any;
  const endpoint = `trending/movie/${timeWindow}?language=en-US`; 

  await api
    .get(endpoint)
    .then((data) => {
      res = data.data;
    })
    .catch((err) => {
      res = err.response;
    });

  return res;
};