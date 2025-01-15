import  { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import ReactQuill from "react-quill";
import TagsInput from "react-tagsinput";
import { v4 as uuidv4 } from 'uuid';
import { Blog } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";

const Preview = () => {
  const { setPublish, title, setTitle, description, setDescription, addPost, imageUrl, tags, setTags, codeBlocks } = Blog();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setLoading(true);
    try {
      const postData = {
        id: uuidv4(), 
        title,
        description,
        imageUrl,
        tags,
        codeBlocks,
      };

      const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
      existingPosts.push(postData);
      localStorage.setItem('posts', JSON.stringify(existingPosts));

      addPost(postData);
      console.log('Post saved successfully:', postData);

      setPublish(false);
      navigate("/");
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="absolute inset-0 bg-white z-30 p-8 px-60">
      <div className="size my-[2rem]">
        <span
          onClick={() => setPublish(false)}
          className="absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer">
          <LiaTimesSolid />
        </span>
        <div className="mt-[8rem] flex flex-col md:flex-row gap-10">
          <div className="flex-[1]">
            <h3>Story Preview</h3>
            <div
              style={{ backgroundImage: `url(${imageUrl})` }}
              className="w-full h-[200px] object-cover bg-gray-100 my-3 grid 
                place-items-center cursor-pointer bg-cover bg-no-repeat">
              {!imageUrl && <span className="text-center text-[16px] text-gray-500">Include a high-quality image in your story to make it more inviting to readers.</span>}
            </div>
            <input
              type="text"
              placeholder="Title"
              className="outline-none w-full border-b border-gray-300 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <ReactQuill
              theme="bubble"
              value={description}
              onChange={setDescription}
              placeholder="Tell Your Story..."
              className="py-3 border-b border-gray-300"
            />
            <p className="text-gray-500 pt-4 text-sm">
              <span className="font-bold">Note:</span> Changes here will affect
              how your story appears in public places like ’s homepage and
              in subscribers’ inboxes — not the contents of the story itself.
            </p>
          </div>
          <div className="flex-[1] flex flex-col gap-4 mb-5 md:mb-0">
            <h3 className="text-2xl">
              Publishing to:
              <span className="font-bold capitalize">ED ACADIA</span>
            </h3>
            <p>
              Add or change topics up to 5 so readers know what your story is
              about
            </p>
            <TagsInput value={tags} onChange={setTags} />
            <button
              onClick={handleSubmit}
              className="btn !bg-green-800 !w-fit !text-white !rounded-full">
              {loading ? "Submitting..." : "Publish Now"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'none' }}>
        {codeBlocks.map((code, index) => (
          <pre key={index} className="my-2 p-2 border border-gray-300 rounded">
            <code>{code}</code>
          </pre>
        ))}
      </div>
    </section>
  );
};

export default Preview;
