import { BG_URL } from "../utils/constant";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <>
        <div className="fixed -z-10 ">
            <img className="" src={BG_URL} alt="background" />
        </div>
        <div>
        <GptSearchBar/>
        <GptMovieSuggestion/>
    </div>
    </>
  )
};

export default GptSearch;