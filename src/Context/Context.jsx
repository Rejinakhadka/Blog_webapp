import React, { useContext, useEffect, useState, createContext } from "react";
import Loading from "../components/Loading/Loading";
import useFetch from "../components/hooks/useFetch";

const BlogContext = createContext();

const Context = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [commentLength, setCommentLength] = useState(0);
  const [authModel, setAuthModel] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publish, setPublish] = useState(false);
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState(""); // Added to context
  const [postData, setPostData] = useState([]);

  const { data, loading: postLoading } = useFetch("posts");

  useEffect(() => {
    const mockUsers = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ];
    setAllUsers(mockUsers);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (data) {
      setPostData(data);
    }
  }, [data]);

  const addPost = (newPost) => {
    setPostData((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <BlogContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        allUsers,
        publish,
        setPublish,
        showComment,
        setShowComment,
        commentLength,
        setCommentLength,
        updateData,
        setUpdateData,
        title,
        setTitle,
        description,
        setDescription,
        postData,
        postLoading,
        authModel,
        setAuthModel,
        imageUrl,  // Provided in context
        setImageUrl, // Provided in context
        tags,
        setTags,
        addPost,
      }}
    >
      {loading ? <Loading /> : children}
    </BlogContext.Provider>
  );
};

export default Context;

export const Blog = () => useContext(BlogContext);
