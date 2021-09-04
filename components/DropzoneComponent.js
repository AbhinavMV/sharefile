import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function DropzoneComponent({ setFile }) {
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: "image/jpeg,image/png,audio/mpeg",
  });

  return (
    <div
      {...getRootProps()}
      className={`h-80 w-80 m-4 border-2 border-dashed border-yellow-300 rounded-md items-center flex text-white justify-center ${
        isDragActive && "border-green-500"
      } ${isDragReject && "border-red-600"}`}
    >
      <input {...getInputProps()} className="h-full w-full p-4 border border-dashed" />
      <div className="flex flex-col justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-yellow-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        <p className="font-semibold text-xl">Drag and drop file here.</p>
        <p className="text-gray-300 text-sm">Only jpeg,png & mp3 files supported</p>
      </div>
    </div>
  );
}

export default DropzoneComponent;
