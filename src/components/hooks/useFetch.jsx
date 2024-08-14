import React, { useEffect, useState } from "react";
import { recommendedPosts } from "../../data"; // Import your mock data

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (url === 'posts') {
        // Simulate fetching posts data
        setTimeout(() => {
          setData(recommendedPosts);
          setLoading(false);
        }, 1000);
      } else {
        try {
          const response = await fetch(url);
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    loading,
  };
};

export default useFetch;
