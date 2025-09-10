import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { RiUploadCloud2Line } from "react-icons/ri";
import { FiX, FiTrash2 } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";

function ImageUploadModal({ onUpload, onClose }) {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(
      Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile),
      })
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
    },
    multiple: false,
  });

  const handleUpload = () => {
    console.log("Uploading file:", file);
    onUpload(file);
  };

  const handleClear = () => {
    if (file) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        {/* Modal Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800">Upload an Image</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Dropzone Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors duration-300
                        ${
                          isDragActive
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-300 hover:border-emerald-400 hover:bg-gray-50"
                        }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="flex flex-col items-center">
                <img
                  src={file.preview}
                  alt="Preview"
                  className="max-h-48 rounded-lg object-contain"
                  // Revoke data uri on unload
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
                <p className="mt-4 font-semibold text-gray-700">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <RiUploadCloud2Line size={48} className="mb-4 text-gray-400" />
                {isDragActive ? (
                  <p className="font-semibold text-lg text-emerald-600">
                    Drop the image here...
                  </p>
                ) : (
                  <>
                    <p className="font-semibold text-lg">
                      Drag & drop an image here
                    </p>
                    <p className="my-2">or</p>
                    <p className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm">
                      Click to browse
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t bg-gray-50 rounded-b-xl flex justify-end items-center space-x-3">
          {file && (
            <button
              onClick={handleClear}
              className="flex items-center space-x-2 bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
            >
              <FiTrash2 size={16} />
              <span>Clear</span>
            </button>
          )}
          <button
            onClick={handleUpload}
            disabled={!file}
            className="bg-emerald-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadModal;
