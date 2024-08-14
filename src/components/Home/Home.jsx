import React from "react";
import Posts from "../Common/Posts/Posts";


const Home = () => {
  return (
    <section className="size flex gap-[5rem] relative  w-[90%] md:w-[80%] mx-auto">
      <div className="flex-[2] py-10 mb-[4rem]">
        <Posts />
      </div>
      <div className="hidden md:inline-block md:w-[21rem] p-7 border-l border-gray-300">
        <h3>Recommended Post Section</h3>
      </div>
    </section>
  );
};

export default Home;
