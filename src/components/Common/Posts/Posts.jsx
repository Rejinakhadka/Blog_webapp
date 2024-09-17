import React, { useEffect, useState } from "react";
import Loading from "../../Loading/Loading";
import PostsCard from "./PostsCard";

const Posts = () => {
  const [postData, setPostData] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      setPostLoading(true);
      try {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPostData(storedPosts);
      } catch (error) {
        console.error('Error retrieving posts from local storage:', error);
      } finally {
        setPostLoading(false);
      }
    };

    fetchDataFromLocalStorage();
  }, []);

  return (
    <section className="flex flex-col gap-[2.5rem]">
      {postLoading ? (
        <Loading />
      ) : (
        postData.length > 0
          ? postData.map((post, i) => <PostsCard post={post} key={i} />)
          : <p>No posts available</p>
      )}
    </section>
  );
};

export default Posts;
