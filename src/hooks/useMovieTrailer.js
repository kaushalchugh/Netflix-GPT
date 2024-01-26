import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTrailerVideo } from "../store/moviesSlice";
import { useEffect } from "react";
const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    // fetch trailer video && updating the store with trailer video data
    const trailerVideos = useSelector((store) => store.movies.trailerVideos);
    const getMovieVideos = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US", API_OPTIONS);
        const json = await data.json();

        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addTrailerVideo(trailer));
    };


    useEffect(() => {
        !trailerVideos && getMovieVideos();
    },[]);
};

export default useMovieTrailer;