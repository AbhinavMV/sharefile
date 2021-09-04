import Head from "next/head";
import fileDownload from "js-file-download";
import File from "../../lib/models/File";
import connectDatabase from "../../lib/database";
import RenderFile from "../../components/RenderFile";
function Download({ file: { name, type, size, id } }) {
  const handleDownload = async () => {
    const response = await fetch(`/api/download/${id}`);
    const blobData = await response.blob();
    fileDownload(blobData, name);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800">
      {!id ? (
        <span className="text-white text-4xl">File does not exist! Check the URL</span>
      ) : (
        <div>
          <Head>
            <title>Download</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <div className="flex flex-col items-center space-y-4 bg-gray-700 p-4 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-red-600 bg-yellow-400 rounded-full p-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="text-2xl text-white py-2">Your file is ready to be downloaded</h1>
              <RenderFile file={{ name, type, size: parseFloat(size) }} />
              <button
                onClick={handleDownload}
                className="bg-gray-900 text-white p-2 rounded-lg font-semibold active:scale-110 transition duration-300 ease-out"
              >
                Download
              </button>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default Download;

export async function getServerSideProps(context) {
  connectDatabase();
  const { id } = context.query;
  try {
    const file = await File.findById(id);
    if (!file) return res.status(404).json({ message: "File does not exist" });
    const { filename, format, sizeInBytes } = file;
    return {
      props: {
        file: { name: filename, size: sizeInBytes, type: format, id },
      },
    };
  } catch (error) {
    return { props: { file: {} } };
  }
}
