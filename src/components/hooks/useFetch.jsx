import React, { useEffect, useState } from "react";
import { recommendedPosts } from "../../data";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setData(recommendedPosts);
        setLoading(false);
      }, 1000); 
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
  };
};

export default useFetch;
