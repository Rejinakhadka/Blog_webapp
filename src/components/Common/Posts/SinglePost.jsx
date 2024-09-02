import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { Blog } from "../../../Context/Context";

const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { postData } = Blog(); // Assuming Blog provides postData directly

  useEffect(() => {
    // Find the post based on postId from postData
    const foundPost = postData.find((item) => item.id === parseInt(postId));
    
    if (foundPost) {
      setPost(foundPost);
      setLoading(false);
    } else {
      // Handle post not found case
      setError("Post not found");
      setLoading(false);
    }
  }, [postId, postData]);

  console.log(postData,"55")

  // If there's an error, show the error message
  if (error) return <div>Error: {error}</div>;
  
  // If data is loading, show the loading spinner
  if (loading) return <Loading />;

  // Destructure post properties after ensuring post is defined
  const { title, description, imageUrl, userImg, user, date, codeBlocks } = post || {};

  return (
    <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
      <h2 className="text-4xl font-extrabold capitalize">{title}</h2>
      <div className="flex items-center gap-2 py-[2rem]">
        {/* Uncomment if needed
        <img
          onClick={() => navigate(`/profile/${userImg}`)}
          className="w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer"
          src={userImg}
          alt="user-img"
        />
        <div>
          <p className="font-medium text-lg">{user}</p>
          <p className="text-sm text-gray-600">{new Date(date).toLocaleDateString()}</p>
        </div>
        */}
      </div>
      <div className="mt-[3rem]">
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
        {/* Render code blocks */}
        {codeBlocks && codeBlocks.length > 0 && (
          <div className="mt-6">
            {codeBlocks.map((code, index) => (
              <pre key={index} className="my-2 p-2 border border-gray-300 rounded bg-gray-100">
                <code>{code}</code>
              </pre>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SinglePost;
