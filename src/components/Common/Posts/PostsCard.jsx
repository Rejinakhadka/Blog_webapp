import React from "react";
import { useNavigate } from "react-router-dom";

const PostsCard = ({ post }) => {
  const { title, description, imageUrl, user, id,codeBlocks } = post;

  const navigate = useNavigate();

  return (
    <section>
      <div
        onClick={() => navigate(`/post/${id}`)}
        className="flex flex-col sm:flex-row gap-4 cursor-pointer"
      >
        <div className="flex-[2.5]">
          <p className="pb-2 font-semibold capitalize">{user}</p>
          <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize">
            {title}
          </h2>
          <div
            className="py-1 text-gray-500 line-clamp-2 leading-5"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        {imageUrl && (
          <div className="flex-[1]">
            <img
              src={imageUrl}
              
              className="w-[53rem] h-[8rem] object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PostsCard;
