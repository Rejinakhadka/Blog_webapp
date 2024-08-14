import axios from "axios";

export const publishPost = async (postData) => {
  try {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", postData);
    return response;
  } catch (error) {
    throw error;
  }
};
