import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "../gpt/GptSearch";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  useTopRatedMovies();
  usePopularMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header/>
      {
        showGptSearch ? (<GptSearch/>) : (
          <>
            <MainContainer/>
            <SecondaryContainer/>
          </>
          ) 
      }
      {/**
      MainContainer
        -VideoBackGround
        -VideoTitle
      SecondaryContainer
        -MovieList * N 
        -Cards * N */}
    </div>
  );
};
export default Browse;