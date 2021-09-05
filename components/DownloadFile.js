import EmailForm from "./EmailForm";

function DownloadFile({ downloadPageLink, id }) {
  return (
    <div className="w-80 break-words mt-2">
      <div className="flex flex-col w-full">
        <p className="text-center text-gray-300 text-md">Share the below link.</p>
        <div className="flex bg-gray-600 items-center rounded-md mt-2">
          <p className="break-all text-white py-2 px-1 ">{downloadPageLink}</p>
          <div className="">
            <svg
              onClick={() => navigator.clipboard.writeText(downloadPageLink)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-10 text-gray-300 cursor-pointer active:scale-110 transition duration-200 ease-out"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
          </div>
        </div>
        <EmailForm id={id} />
      </div>
    </div>
  );
}

export default DownloadFile;
