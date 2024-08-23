import React, { useEffect, useState } from "react";

const useFetch = (url, useLocalStorage = false) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (useLocalStorage) {
        // Fetch data from local storage
        const storedData = localStorage.getItem('draftPost');
        if (storedData) {
          setData(JSON.parse(storedData));
          setLoading(false);
          return;
        }
      }

      // Fetch data from the network
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);

        // Save fetched data to local storage if needed
        if (useLocalStorage) {
          localStorage.setItem('draftPost', JSON.stringify(result));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, useLocalStorage]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
