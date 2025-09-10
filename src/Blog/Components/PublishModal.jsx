import { useCallback, useContext, useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { GrGrid } from "react-icons/gr";
import AuthContext from "../../Context/AuthContext";
import { fileUploadAPI } from "../../Service/Operation/BlogService";
import { useDropzone } from "react-dropzone";

function PublishModal({ categories, onClose, onPublish }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [readTime, setReadTime] = useState(0);

  const authContext = useContext(AuthContext);
  const { token } = authContext.data || {};

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log("file:", file);
    if (file) {
      setFile(file);
      setThumbnail({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".gif", ".webp"] },
    multiple: false,
  });

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handlePublishClick = async () => {
    const fileData = new FormData();
    fileData.append("file", file);
    try {
      const response = await fileUploadAPI(fileData, token);
      console.log("file upload response:", response);
      if (response.status === 200) {
        const imageUrl = response?.data?.data || "";
        const postMetadata = {
          thumbnail: imageUrl,
          tags,
          category,
          readTime,
        };
        console.log("postMetadata:", postMetadata);
        onPublish(postMetadata);
        onClose();
      }
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 font-sans transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Publish Settings</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Modal Body with Responsive Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Thumbnail Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Cover Image
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors duration-300 h-64 flex flex-col items-center justify-center
                                ${
                                  isDragActive
                                    ? "border-emerald-500 bg-emerald-50"
                                    : "border-gray-300 hover:border-emerald-400 bg-gray-50"
                                }`}
            >
              <input {...getInputProps()} />
              {thumbnail ? (
                <img
                  src={thumbnail.preview}
                  alt="Thumbnail preview"
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                <div className="text-gray-500">
                  <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 font-semibold">
                    Click or drag file to upload
                  </p>
                  <p className="text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
            {thumbnail && (
              <button
                onClick={() => setThumbnail(null)}
                className="text-xs text-red-500 hover:underline"
              >
                Remove Image
              </button>
            )}
          </div>

          {/* Right Column: Tags & Category */}
          <div className="space-y-6">
            {/* Tag Input */}
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Tags
              </label>
              <div className="relative border border-gray-300 rounded-lg p-2 flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-emerald-500">
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
                  placeholder={
                    tags.length < 5 ? "Add up to 5 tags..." : "5 tags max"
                  }
                  className="flex-grow border-0 focus:ring-0 p-1 text-sm outline-none bg-transparent"
                  disabled={tags.length >= 5}
                />
              </div>
            </div>

            {/* Category Select */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Category
              </label>
              <div className="relative">
                <GrGrid className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition appearance-none bg-white hover:border-emerald-400"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option
                      key={cat.id}
                      value={cat.name}
                      title={cat.description}
                      className="py-2 px-3 text-gray-800 hover:bg-emerald-50"
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
                {category && (
                  <div className="mt-2 text-xs text-gray-500 bg-gray-50 rounded p-2 border border-gray-100">
                    {
                      categories.find((cat) => cat.name === category)
                        ?.description
                    }
                  </div>
                )}
              </div>
            </div>

            {/* Estimated Read Time */}
            <div>
              <label
                htmlFor="readTime"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Estimated Read Time (minutes)
              </label>
              <input
                id="readTime"
                type="number"
                min="1"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                placeholder="e.g., 5(Just put the number only)"
              />
            </div>
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end space-x-3 bg-gray-50 px-6 py-4 rounded-b-xl border-t border-gray-200">
          <button
            type="button"
            className="cursor-pointer px-5 py-2.5 rounded-lg bg-white text-gray-800 font-semibold border border-gray-300 hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            Back to Editor
          </button>
          <button
            type="button"
            onClick={handlePublishClick}
            disabled={!thumbnail || !category || tags.length === 0}
            className="cursor-pointer px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <BiCheckCircle size={18} />
            <span>Publish Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublishModal;
