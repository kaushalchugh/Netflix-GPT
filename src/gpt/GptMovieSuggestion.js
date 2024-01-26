import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";

const GptMovieSuggestion = () => {
    const { movieNames, movieResults } = useSelector((store) => store.gpt);
    if(!movieNames) return null;

    return(
        <div className="p-4 m-4 bg-black text-white bg-opacity-90">
            <div>
                {movieNames.map((movieName, index) =>(
                    <MovieList 
                        key={movieName} 
                        title={movieName} 
                        movie={movieResults[index]}
                    />
                ))}
            </div>
        </div>
    );
};
export default GptMovieSuggestion;