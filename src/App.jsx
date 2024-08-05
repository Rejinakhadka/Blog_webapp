import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import HomeHeader from "./components/Home/Header/HomeHeader";

const App = () => {
  return (
    <>
    <HomeHeader/>
  <Routes>
    <Route path="/" element={<Home/>}/>
  </Routes>
    </>
  );
};

export default App;
