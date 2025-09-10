import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";

export default function DropzoneUploader({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".gif"] },
    multiple: false,
  });

  return (
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
      <div className="flex flex-col items-center text-gray-500">
        <FaUpload size={48} className="mb-4 text-gray-400" />
        {isDragActive ? (
          <p className="font-semibold text-lg text-emerald-600">
            Drop the image here...
          </p>
        ) : (
          <>
            <p className="font-semibold text-lg">
              Drag & drop an image or click to upload
            </p>
            <p className="text-sm mt-1">
              For best results, use a clear photo of a leaf or flower.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
