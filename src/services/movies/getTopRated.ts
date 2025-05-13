import api from "../api";

export const getTopRated = async () => {
    let res: any;
    const endpoint = "movie/top_rated?Language=en-US"
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