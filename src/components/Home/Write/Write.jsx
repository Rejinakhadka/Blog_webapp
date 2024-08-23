import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "./styles.css";
import Preview from "./Preview";
import { Blog } from "../../../Context/Context";
import { BsPlusCircle, BsImage, BsCameraVideo, BsCode } from "react-icons/bs";

const Write = () => {
  const { title, description, setTitle, setDescription, publish, imageUrl, setImageUrl } = Blog();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        setImageUrl(""); 
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setImageUrl]);

  const handleImageUpload = () => {
    document.getElementById('imageUploadInput').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
    }
  };

  return (
    <section className="w-[90%] md:w-[90%] lg:w-[60%] mx-auto py-[3rem] relative">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="text-4xl outline-none w-full"
      />
      <ReactQuill
        theme="bubble"
        value={description}
        onChange={setDescription}
        placeholder="Tell Your Story..."
        className="write my-5"
      />

      <BsPlusCircle
        className="absolute bottom-16 left-[-50px] text-4xl cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      />

      {showMenu && (
        <div className="absolute bottom-[3.7rem] left-[-12px] bg-white p-2 flex space-x-2">
          <button
            className="p-2 hover:bg-gray-100"
            title="Add Image"
            onClick={handleImageUpload}
          >
            <BsImage className="text-xl" />
          </button>
          <button className="p-2 hover:bg-gray-100" title="Add Video">
            <BsCameraVideo className="text-xl" />
          </button>
          <button className="p-2 hover:bg-gray-100" title="Add Code Block">
            <BsCode className="text-xl" />
          </button>
        </div>
      )}

      <input
        type="file"
        id="imageUploadInput"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <div className="my-5">
        {imageUrl && (
          <figure className="relative my-3">
            <img
              src={imageUrl}
              alt="Uploaded"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </figure>
        )}
      </div>

      <div
        className={`${
          publish ? "visible opacity-100" : "invisible opacity-0"
        } transition-all duration-200`}
      >
        <Preview />
      </div>
    </section>
  );
};

export default Write;
