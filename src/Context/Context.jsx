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
  const [imageUrl, setImageUrl] = useState("");
  const [postData, setPostData] = useState([]);

  const { data, loading: postLoading } = useFetch(""); // Consider using a URL or handle this case

  useEffect(() => {
    // Load post data from local storage
    const storedPostData = localStorage.getItem('draftPost');
    if (storedPostData) {
      setPostData([JSON.parse(storedPostData)]);
    }
    setLoading(false); // Ensure loading is set to false when data is loaded
  }, []);

  useEffect(() => {
    // Save post data to local storage whenever it changes
    if (postData.length > 0) {
      localStorage.setItem('draftPost', JSON.stringify(postData[0]));
    }
  }, [postData]);

  const addPost = (newPost) => {
    const updatedPostData = [newPost, ...postData];
    setPostData(updatedPostData);
    localStorage.setItem('draftPost', JSON.stringify(newPost));
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
        imageUrl,
        setImageUrl,
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
