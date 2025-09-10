import { useState, useRef, useMemo, useContext } from "react";
import ReactQuill from "react-quill-new";
import EmojiPicker from "emoji-picker-react";
import AuthContext from "../../Context/AuthContext";
import { FiSmile } from "react-icons/fi";
import {
  createBlogPostAPI,
  fileUploadAPI,
} from "../../Service/Operation/BlogService";

import ImageResize from "quill-image-resize-module-react";

import Quill from "quill";
Quill.register("modules/imageResize", ImageResize);

export default function BlogEditor({ isOpen, onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const quillRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);
  const { token } = authContext?.data;

  // Custom handler for the image upload button in the toolbar
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      console.log(file);
      console.log(file.name);
      if (file) {
        const data = new FormData();
        data.append("file", file);
        const response = await fileUploadAPI(data, token);
        if (response.status === 200 && response?.data?.data) {
          const imageUrl = response.data.data;
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, "image", imageUrl);
        }
      }
    };
  };

  // Configuration for the Quill editor's toolbar
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    }),
    []
  );

  if (!isOpen) {
    return null;
  }

  // Function to handle emoji selection and insertion
  const onEmojiClick = (emojiObject) => {
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection(true);
    editor.insertText(range.index, emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmission = async (status) => {
    const finalData = {
      title: title,
      description: description,
      content: content,
      status: status.toUpperCase(),
    };
    console.log("finalData inside editor :", finalData);

    onSubmit(finalData);

    onClose();
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className=" mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Blog Post
            </h1>
          </div>

          <div className="space-y-6">
            <input
              type="text"
              placeholder="Your Post Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl font-extrabold border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-emerald-500 py-4 outline-none bg-transparent"
            />

            <textarea
              placeholder="Your Post Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:border-emerald-500 text-gray-700 resize-none h-24"
            />

            {/* Quill Editor and Emoji Picker */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-sm">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  placeholder="Share your gardening story, tips, and successes..."
                />
              </div>
              {/* Custom Emoji Button inside the toolbar area */}
              <div className="absolute top-2.5 right-20 z-10">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1 rounded-md hover:bg-gray-200 text-gray-600 cursor-pointer"
                  title="Insert Emoji"
                >
                  <FiSmile size={18} />
                </button>
                {showEmojiPicker && (
                  <div className="absolute top-full right-0 mt-2 z-20">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-6">
              <button
                onClick={() => handleSubmission("draft")}
                className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                disabled={loading}
              >
                Save Draft
              </button>
              <button
                onClick={() => handleSubmission("published")}
                disabled={!title || !content}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
              >
                Publish Post
              </button>
            </div>
          </div>

          {/* Live Preview Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Live Preview
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-8 prose lg:prose-lg max-w-none">
              <h1>{title || "Your Post Title..."}</h1>
              <p className="text-gray-600">
                {description || "Your post description will appear here..."}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: content || "<p>Your content will appear here...</p>",
                }}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Custom styles to match the theme and for the editor */}
      <style>{`
                .ql-editor { font-size: 1.125rem; line-height: 1.75; color: #374151; min-height: 300px; }
                .ql-toolbar { border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem; border-color: #D1D5DB !important; }
                .ql-container { border-bottom-left-radius: 0.75rem; border-bottom-right-radius: 0.75rem; border-color: #D1D5DB !important; }
                .prose h1 { font-size: 2.25rem; font-weight: bold;}
                .prose h2 { font-size: 1.875rem; font-weight: bold;}
                .prose a { color: #059669; text-decoration: underline; }
                .prose blockquote { border-left: 4px solid #6EE7B7; padding-left: 1rem; font-style: italic; color: #4B5563; }
                .prose img { max-width: 100%; border-radius: 0.5rem; }
            `}</style>
    </div>
  );
}
