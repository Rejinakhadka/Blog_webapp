import { Route, Routes } from "react-router-dom";
import HomeHeader from "./components/Home/Header/HomeHeader";
import Home from "./components/Home/Home";
import Write from "./components/Home/Write/Write";

function App() {

  return (
    <>
      <HomeHeader />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/write" element={<Write />} />
      </Routes>
    </>
  );
}

export default App;
