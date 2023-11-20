import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import socket from "./socket";
const profile = JSON.parse(localStorage.getItem("profile"));
export default function Chat() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.auth = {
      _id: profile._id,
    };
    socket.connect();
    socket.on("receive private message", (data) => {
      const content = data.content;
      setMessages((messages) => [...messages, content]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue("");
    socket.emit("private message", {
      content: value,
      to: "64b283e8157e8e3f2b07860d", // user_id của client 2
    });
  };
  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <div>{message}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
