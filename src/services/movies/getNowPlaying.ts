import api from "../api";

export const getNowPlaying = async () => {
    let res: any;
    const endpoint = "movie/now_playing?Language=en-US"
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