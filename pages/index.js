import Head from "next/head";
import { useState } from "react";
import DownloadFile from "../components/DownloadFile";
import DropzoneComponent from "../components/DropzoneComponent";
import RenderFile from "../components/RenderFile";

export default function Home() {
  const [file, setFile] = useState(null);
  const [id, setId] = useState(null);
  const [downloadPageLink, setDownloadPageLink] = useState(null);
  const [uploadState, setUploadState] = useState("Upload");

  const handleReset = () => {
    setUploadState("Upload");
    setDownloadPageLink(null);
    setId(null);
    setFile(null);
  };

  const handleUpload = async () => {
    setUploadState("Uploading");
    let form = new FormData();
    form.append("myFile", file);
    try {
      const response = await fetch("/api/upload", { method: "POST", body: form });
      const { data } = await response.json();
      console.log(data);
      setId(data.id);
      setDownloadPageLink(data.downloadPageLink);
      setUploadState("Upload");
    } catch (error) {
      setUploadState("Upload Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800">
      <Head>
        <title>Share Files</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl mb-2 text-white">Want to share a file?</h1>
        <div className={`bg-gray-700 rounded-xl shadow-lg ${downloadPageLink && "px-3 py-4"}`}>
          {!downloadPageLink && <DropzoneComponent setFile={setFile} />}
          {file && (
            <>
              <RenderFile file={{ type: file.type, name: file.name, size: file.size }} />
              {!downloadPageLink && (
                <>
                  <button
                    className={`bg-gray-900 ${
                      uploadState === "Uploading" && "bg-gray-500"
                    } text-white py-2 px-4 rounded-lg mb-2`}
                    onClick={handleUpload}
                    disabled={uploadState === "Uploading" || uploadState === "Upload Failed"}
                  >
                    {uploadState}
                  </button>
                  <button
                    className="bg-gray-900 px-4 py-2 rounded-lg text-white ml-2"
                    onClick={handleReset}
                    disabled={uploadState === "Uploading"}
                  >
                    Reset
                  </button>
                </>
              )}
            </>
          )}

          {downloadPageLink && (
            <>
              <DownloadFile downloadPageLink={downloadPageLink} id={id} />
              <button
                className="bg-gray-900 text-white p-2 mt-3 rounded-lg font-semibold"
                onClick={handleReset}
              >
                Upload New File
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
