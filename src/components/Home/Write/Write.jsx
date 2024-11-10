import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Blog } from "../../../Context/Context";
import Preview from "./Preview";
import MonacoEditor from "@monaco-editor/react";
import { BsPlusCircle, BsImage, BsCode, BsXCircle } from "react-icons/bs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const Write = () => {
  const {
    title,
    setTitle,
    publish,
    setDescription,
    description,
    imageUrl,
    setImageUrl,
    codeBlocks,
    setCodeBlocks,
  } = Blog();
  const [editorHtml, setEditorHtml] = useState(description);
  const [showMenu, setShowMenu] = useState(false);
  const [showCodeBlockInput, setShowCodeBlockInput] = useState(false);
  const [currentCodeBlock, setCurrentCodeBlock] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); 

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

  const handleChange = (html) => {
    setEditorHtml(html);
    setDescription(html);
  };

  const handleImageUpload = () => {
    document.getElementById("imageUploadInput").click();
  };

  const imgFilehandler = (e) => {
    if (e.target.files.length !== 0) {
      setImageUrl((imgfile) => [
        ...imgfile,
        URL.createObjectURL(e.target.files[0]),
      ]);
    }
  };

  const handleCodeBlockAdd = () => {
    if (currentCodeBlock.trim()) {
      setCodeBlocks((prevBlocks) => [...prevBlocks, currentCodeBlock]);
      setCurrentCodeBlock("");
      setShowCodeBlockInput(false);
    }
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl === selectedImage ? null : imageUrl);
  };

  return (
    <>
      {!publish && (
        <section className="w-[90%] md:w-[90%] lg:w-[60%] mx-auto py-[3rem] relative">
          <div className="editor-container">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="text-4xl outline-none w-full mb-4"
            />

            <ReactQuill
              value={editorHtml}
              onChange={handleChange}
              modules={Write.modules}
              formats={Write.formats}
        
              placeholder="Tell Your Story..."
            />

            <div
              className="absolute bottom-1 left-[-50px] z-50 cursor-pointer text-4xl"
              onClick={() => setShowMenu(!showMenu)}
            >
              {showMenu ? <BsXCircle /> : <BsPlusCircle />}
            </div>

            {showMenu && (
              <div className="absolute bottom-1 left-0 bg-white border-2 border-green-500 p-2 flex space-x-2 rounded-lg shadow-lg z-50">
                <button
                  className="p-2 hover:bg-gray-100"
                  title="Add Image"
                  onClick={handleImageUpload}
                >
                  <BsImage className="text-xl" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100"
                  title="Add Code Block"
                  onClick={() => setShowCodeBlockInput(!showCodeBlockInput)}
                >
                  <BsCode className="text-xl" />
                </button>
              </div>
            )}

            <input
              type="file"
              id="imageUploadInput"
              accept="image/*"
              onChange={imgFilehandler}
              style={{ display: "none" }}
            />

            <div className="my-5">
              {imageUrl &&
                imageUrl.map((url, index) => (
                  <figure
                    key={index}
                    className="relative my-3 cursor-pointer"
                    onClick={() => handleImageSelect(url)}
                    style={{
                      border: url === selectedImage ? "4px solid green" : "none",
                    }}
                  >
                    <img
                      src={url}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </figure>
                ))}

              {showCodeBlockInput && (
                <div className="my-2 z-50">
                  <MonacoEditor
                    height="200px"
                    language="javascript"
                    value={currentCodeBlock}
                    onChange={(value) => setCurrentCodeBlock(value || "")}
                    theme="vs-dark"
                  />
                  <button
                    onClick={handleCodeBlockAdd}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Add Code Block
                  </button>
                </div>
              )}

              {codeBlocks.length > 0 &&
                codeBlocks.map((code, index) => (
                  <div
                    key={index}
                    className="my-2 p-2 border border-gray-300 rounded"
                  >
                    <SyntaxHighlighter
                      language="jsx"
                      style={solarizedlight}
                      showLineNumbers
                      wrapLines
                    >
                      {code}
                    </SyntaxHighlighter>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
      {publish && (
        <div
          className={`${
            publish ? "visible opacity-100" : "invisible opacity-0"
          } transition-opacity duration-200 p-6`}
        >
          <Preview />
        </div>
      )}
    </>
  );
};

Write.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ],
};

Write.formats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "color",
  "background",
  "align",
];

export default Write;
