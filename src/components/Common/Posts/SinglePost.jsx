import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostFromLocalStorage = () => {
      setLoading(true);
      try {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        console.log('Stored Posts:', storedPosts); // Debugging
        const foundPost = storedPosts.find(post => post.id === postId); // Ensure postId is a string
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError("Post not found");
        }
      } catch (error) {
        console.error('Error retrieving post from local storage:', error);
        setError("Error retrieving post");
      } finally {
        setLoading(false);
      }
    };

    fetchPostFromLocalStorage();
  }, [postId]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const { title, description, imageUrl, codeBlocks } = post || {};
  console.log('Post Image URL:', imageUrl); // Debugging
  return (
    <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
      <h2 className="text-4xl font-extrabold capitalize">{title}</h2>
      <div className="flex items-center gap-2 py-[2rem]">
        {/* Add additional content if needed */}
      </div>
      <div className="mt-[3rem]">
        {/* Display an image if available */}
        {imageUrl && (
          <img
            className="w-full h-[400px] object-cover"
            src={imageUrl}
            alt="post-img"
          />
        )}
        <div
          className="mt-6"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {/* Display code blocks if available */}
        {codeBlocks && codeBlocks.length > 0 && (
          <div className="mt-6">
            {codeBlocks.map((code, index) => (
              <div key={index} className="my-2 p-2 border border-gray-300 rounded bg-gray-100">
                <SyntaxHighlighter
                  language="javascript"
                  style={solarizedlight}
                  showLineNumbers
                  wrapLines
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SinglePost;
