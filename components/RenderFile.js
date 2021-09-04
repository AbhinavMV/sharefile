function RenderFile({ file: { type, name, size } }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center text-white mb-2">
        {type === "audio/mpeg" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-blue-500 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <p className="mr-4">{name}</p>
        <p className="ml-auto">{(size / (1024 * 1024)).toFixed(2)} MB</p>
      </div>
    </div>
  );
}

export default RenderFile;
