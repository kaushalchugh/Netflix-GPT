import { auth } from "../services/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../store/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constant";
import { toogleGptSearchView } from "../store/gptSlice";
import { changeLanguage } from "../store/configSlice";

const Header = () => {

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector(store => store.user);
  const handleSignOut = () =>{
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error");
    });
  };

  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, displayName, photoURL } = user;
            dispatch(
              addUser({uid: uid, email:email, displayName: displayName, photoURL:photoURL,
              })
              );
              navigate("/browse");
          } else {
            dispatch(removeUser());
            navigate("/");
        }
      });

      // unsubscrib when component unmounts
      return () => unsubscribe();
},[]);

  const handleGptSearchClick = () => {
    //Toogle GPT Search button
    dispatch(toogleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
        <img className="w-44 mx-auto md:mx-0"  alt="logo" src={LOGO}/>
        
        {user &&
        (<div className="flex p-2 justify-between">
          { showGptSearch && (<select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang=> <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>)}
          <button className="px-2 py-2 mx-2 my-2 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick}>
          {showGptSearch ? "Homepage" : "Search-GPT"}</button>
          <div className="flex">
          <img className="w-10 h-10 hidden md:block" alt="usericon" src={user?.photoURL}/>
          <button onClick={handleSignOut} className="font-bold text-white">Sign Out</button>
          </div>
        </div>)}
    </div>
  )
};

export default Header;