import { useRef } from "react";
import openai from "../services/openai";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../store/gptSlice";
const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    //search movie in TMDB
    const searchMovieTMDB = async (movie) =>{
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+ movie +"&include_adult=false&language=en-US&page=1", API_OPTIONS);
        const json = await data.json();

        return json.results;
    };
    const handleGptsearchClick = async() => {

        //make an api call to gpt api and get movie results

        const gptQuery = "Act as a Movie Recommendation System and suggest some movies for this query : " + searchText.current.value + ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });

        if (!gptResults.choices){
            //todo : error handling
        }
       const gptMovies = gptResults.choices?.[0]?.message?.content.split(", ");

       //for each movie i will search TMBD API

       const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));

       const tmdbResults = await Promise.all(promiseArray);
       dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));

    };

    return (
        <div className="pt-[30%] md:pt-[7%] flex justify-center">
            <form className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-md" onSubmit={(e) => e.preventDefault()}>
                <input ref={searchText} type="text" className="py-2 px-4 m-4 col-span-9 rounded-lg" placeholder={lang[langKey].gptSearchPlaceholder}/>
                <button className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3" onClick={handleGptsearchClick}>{lang[langKey].search}</button>
            </form>
        </div>
    )
};

export default GptSearchBar;