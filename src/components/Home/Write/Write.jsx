import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { Blog } from "../../../Context/Context"; 
import Preview from './Preview'; 
import MonacoEditor from "@monaco-editor/react";
import { BsPlusCircle, BsImage, BsCode, BsXCircle } from 'react-icons/bs'; 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'; 

const Write = () => {
    const { title, setTitle, publish, setDescription, description, imageUrl, setImageUrl, codeBlocks, setCodeBlocks } = Blog();
    const [editorHtml, setEditorHtml] = useState(description);
    const [showMenu, setShowMenu] = useState(false);
    const [showCodeBlockInput, setShowCodeBlockInput] = useState(false);
    const [currentCodeBlock, setCurrentCodeBlock] = useState('');

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Backspace") {
                setImageUrl([]);
                setCodeBlocks([]);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [setImageUrl, setCodeBlocks]);

    const handleChange = (html) => {
        setEditorHtml(html);
        setDescription(html);
    };

    const handleImageUpload = () => {
        document.getElementById('imageUploadInput').click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setImageUrl(prevImages => [...prevImages, ...newImages]); 
    };

    const handleCodeBlockAdd = () => {
        if (currentCodeBlock.trim()) {
            setCodeBlocks(prevBlocks => [...prevBlocks, currentCodeBlock]);
            setCurrentCodeBlock('');
            setShowCodeBlockInput(false);
        }
    };

    return (
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
                    className="my-5"
                    placeholder="Tell Your Story..."
                />

                <div className="absolute bottom-1 left-[-50px] z-50 cursor-pointer text-4xl" onClick={() => setShowMenu(!showMenu)}>
                    {showMenu ? <BsXCircle /> : <BsPlusCircle />}
                </div>

                {showMenu && (
                    <div className="absolute bottom-1 left-0 bg-white border-2 border-green-500 p-2 flex space-x-2 rounded-lg shadow-lg z-50">
                        <button className="p-2 hover:bg-gray-100" title="Add Image" onClick={handleImageUpload}>
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
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                <div className="my-5">
                    {imageUrl.length > 0 &&
                        imageUrl.map((image, index) => (
                            <figure
                                key={index}
                                className="relative my-3"
                            >
                                <img
                                    src={image}
                                    alt="Uploaded"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </figure>
                        ))
                    }

                    {showCodeBlockInput && (
                        <div className="my-2 z-50">
                            <MonacoEditor
                                height="200px"
                                language="javascript"
                                value={currentCodeBlock}
                                onChange={(value) => setCurrentCodeBlock(value || '')}
                                theme="vs-dark"
                            />
                            <button
                                onClick={handleCodeBlockAdd}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Add Code Block
                            </button>
                        </div>
                    )}

                    {codeBlocks.length > 0 &&
                        codeBlocks.map((code, index) => (
                            <div key={index} className="my-2 p-2 border border-gray-300 rounded">
                                <SyntaxHighlighter
                                    language="jsx"
                                    style={solarizedlight}
                                    showLineNumbers
                                    wrapLines
                                >
                                    {code}
                                </SyntaxHighlighter>
                            </div>
                        ))
                    }
                </div>

                <div className={`${publish ? "visible opacity-100" : "invisible opacity-0"} transition-opacity duration-200`}>
                    <Preview />
                </div>
            </div>
        </section>
    );
};

Write.modules = {
    toolbar: [
        [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean']
    ],
};

Write.formats = [
    'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'color', 'background', 'align',
];

export default Write;
