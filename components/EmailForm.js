import { useState } from "react";

function EmailForm({ id }) {
  const [message, setMessage] = useState(null);
  const [emailTo, setEmailTo] = useState("");
  const [senderName, setSenderName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({ id, emailTo, senderName }),
      });
      const data = await response.json();
      console.log(data);
      setMessage(data.message);
      // console.log(message);
    } catch (error) {
      console.log(error);
      setMessage(error?.message);
    }
  };

  return (
    <div className="mt-2">
      <h1 className="text-white text-lg font-semibold">You can also send the file through mail</h1>
      <form
        className="flex flex-col space-y-2 px-4 my-1 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-transparent rounded-md text-white border border-yellow-50 px-4 py-1 outline-none"
          type="text"
          placeholder="Your Name"
          required
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
        />
        <input
          className="bg-transparent rounded-md text-white border border-yellow-50 px-4 py-1 outline-none"
          type="email"
          placeholder="Email To"
          required
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
        />
        {!message ? (
          <button
            type="submit"
            className={`bg-gray-900 text-white p-2 rounded-lg font-semibold ${
              !emailTo || !senderName ? "opacity-50" : ""
            }`}
            disabled={!emailTo || !senderName}
          >
            Send Email
          </button>
        ) : (
          <p
            className={`font-bold text-white text-xl ${
              message === "Email Sent" && "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default EmailForm;
