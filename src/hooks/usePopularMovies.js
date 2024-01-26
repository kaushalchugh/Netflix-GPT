import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addPopularMovies } from "../store/moviesSlice";
import { API_OPTIONS } from "../utils/constant";

const usePopularMovies = () => {
        const dispatch = useDispatch();

        const popularMovies = useSelector((store) => store.popularMovies);
        const getPopularMovies = async () => {
            const data = await fetch("https://api.themoviedb.org/3/movie/popular?page=1", API_OPTIONS);
            const json = await data.json();
            dispatch(addPopularMovies(json.results));
        };

        useEffect(() => {
            !popularMovies && getPopularMovies();
        }, []);
};

export default usePopularMovies;