import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Loading/Loading";
import useFetch from "../../hooks/useFetch";

const SinglePost = () => {
  const { postId } = useParams();
  const { data, loading } = useFetch("posts");
  const navigate = useNavigate();

  // Debugging: log fetched data and postId
  console.log("Fetched data:", data);
  console.log("Post ID from URL:", postId);

  // Find the specific post
  const post = data.find((item) => item.postId === parseInt(postId, 10));

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        post ? (
          <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
            <h2 className="text-4xl font-extrabold capitalize">{post.title}</h2>
            <div className="flex items-center gap-2 py-[2rem]">
              <img
                onClick={() => navigate(`/profile/${post.userImg}`)}
                className="w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer"
                src={post.userImg}
                alt="user-img"
              />
              <div>
                <p className="font-medium text-lg">{post.user}</p>
                <p className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="mt-[3rem]">
              {post.postImg && (
                <img
                  className="w-full h-[400px] object-cover"
                  src={post.postImg}
                  alt="post-img"
                />
              )}
              <div
                className="mt-6"
                dangerouslySetInnerHTML={{ __html: post.description }}
              />
            </div>
          </section>
        ) : (
          <p>Post not found</p>
        )
      )}
    </>
  );
};

export default SinglePost;
