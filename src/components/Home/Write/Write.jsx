import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "./styles.css";
import Preview from "./Preview";
import { Blog } from "../../../Context/Context";
import { BsPlusCircle, BsImage, BsCameraVideo, BsCode } from "react-icons/bs";

const Write = () => {
const {title,description,setTitle, setDescription, publish , setPublish}=Blog();
const[showMenu,setShowMenu]= useState(false)


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
        <div className="absolute bottom-[3.7rem] left-[-12px] bg-white  p-2  flex space-x-2">
          <button className="p-2 hover:bg-gray-100" title="Add Image">
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

      <div
        className={`${
          publish ? "visible opacity-100" : "invisible opacity-0"
        } transition-all duration-200`}
      >
        <Preview
          // setPublish={setPublish}
          // description={description}
          // title={title}
        />
      </div>
    </section>
  );
};

export default Write;
