import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";

function Drop({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png"] },
    multiple: false,
  });
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors duration-300 ${
        isDragActive
          ? "border-emerald-500 bg-emerald-50"
          : "border-gray-300 hover:border-emerald-400 hover:bg-gray-50"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center text-gray-500">
        <IoCloudUploadOutline className="mb-4 text-2xl text-gray-400" />
        <p className="font-semibold text-lg">
          {isDragActive
            ? "Drop the image here..."
            : "Drag & drop an image of an affected leaf"}
        </p>
        <p className="text-sm mt-1">or click to upload</p>
      </div>
    </div>
  );
}

export default Drop;
