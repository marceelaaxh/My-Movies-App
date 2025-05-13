import api from "../api";

export const getPopularMovies = async () => {
    let res: any;
    const endpoint = "movie/popular?Language=en-US"
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