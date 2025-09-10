import {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useContext,
} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import ReactQuill, { Quill } from "react-quill-new";
import ImageResize from "quill-image-resize-module-react";
import {
  editBlogPostAPI,
  fileUploadAPI,
  getBlogPostDetailsAPI,
} from "../../Service/Operation/BlogService";
import { FiUpload, FiX } from "react-icons/fi";
import AuthContext from "../../Context/AuthContext";
import toast from "react-hot-toast";

Quill.register("modules/imageResize", ImageResize);

// --- Loading Skeleton ---
const EditSkeleton = () => (
  <div className="animate-pulse space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="h-64 bg-gray-300 rounded-xl"></div>
      <div className="lg:col-span-2 space-y-4">
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-24 bg-gray-300 rounded"></div>
      </div>
    </div>
    <div className="h-12 bg-gray-300 rounded"></div>
    <div className="h-96 bg-gray-300 rounded-xl"></div>
  </div>
);

// --- Main EditPostPage Component ---
export default function EditPostPage() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState({ preview: "" });
  const [thumbnailResp, setThumbnailResp] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const quillRef = useRef(null);

  const authContext = useContext(AuthContext);
  const { token } = authContext.data;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getBlogPostDetailsAPI(postId);
        console.log("Post details response:", response);
        if (response.status === 200 && response.data?.data) {
          const post = response.data.data;
          setTitle(post.title);
          setDescription(post.description || "");
          setContent(post.content || "");
          setThumbnail({ file: null, preview: post.thumbnail });
          setTags(post.tags || []);
        } else {
          throw new Error("Post not found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setThumbnail({ file, preview: URL.createObjectURL(file) });

      const data = new FormData();
      data.append("file", file);
      const response = await fileUploadAPI(data, token);
      if (response.status === 200 && response?.data?.data) {
        const imageUrl = response.data.data;
        setThumbnailResp(imageUrl);
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, "image", imageUrl);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) =>
    setTags(tags.filter((tag) => tag !== tagToRemove));

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection(true);
        try {
          const response = await fileUploadAPI(formData, token);
          console.log("image upload response:", response);
          if (response.status === 200 && response?.data?.data) {
            // const imageUrl = response.data.data;
            // setContent()
            editor.insertEmbed(range.index, "image", response.data.data);
          }
        } catch (err) {
          console.error("Image upload failed:", err);
          alert("Image upload failed.");
        }
      }
    };
  }, []);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image", "clean"],
        ],
        handlers: { image: imageHandler },
      },
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    }),
    []
  );

  const handleSaveChanges = async () => {
    const updatedData = {
      title,
      description,
      content,
      tags,
      thumbnail: thumbnailResp,
    };
    console.log("Saving updated data:", updatedData);
    const toastId = toast.loading("Saving changes...");
    try {
      const response = await editBlogPostAPI(postId, updatedData, token);
      if (response.status === 200) {
        toast.success("Changes saved successfully!", { id: toastId });
        navigate(`/blog/details/${postId}`);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Failed to save changes.", { id: toastId });
    }
  };

  if (loading)
    return (
      <div className="p-8">
        <EditSkeleton />
      </div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
          <p className="text-gray-500 mt-1">
            Make changes to your post and save them when you're ready.
          </p>
        </header>

        {/* Thumbnail and Meta Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Cover Image
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors h-64 flex items-center justify-center ${
                isDragActive
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-300 hover:border-emerald-400 bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              {thumbnail.preview ? (
                <img
                  src={thumbnail.preview}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                <div className="text-gray-500">
                  <FiUpload className="mx-auto h-10 w-10" />
                  <p className="mt-2 text-sm">Update cover image</p>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-2xl font-bold border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Short Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Tags
          </label>
          <div className="border border-gray-300 rounded-lg p-2 flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-emerald-500">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-emerald-600 hover:text-emerald-900"
                >
                  <FiX size={14} />
                </button>
              </span>
            ))}
            <input
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder={tags.length < 5 ? "Add a tag..." : "Max 5 tags"}
              className="flex-grow border-0 focus:ring-0 p-1 text-sm outline-none"
              disabled={tags.length >= 5}
            />
          </div>
        </div>

        {/* Quill Editor for Content */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Main Content
          </label>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <Link
            to="/blog"
            className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </Link>
          <button
            onClick={handleSaveChanges}
            className="cursor-pointer px-8 py-3 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
      <style>{`.ql-editor { min-height: 250px; } .ql-snow .ql-editor img { max-width: 100%; border-radius: 0.5rem; }`}</style>
    </div>
  );
}
