import { useState } from "react";
import "./Chat.css";
import Contact from "../Contact/Contact";
import Message from "../Message/Message";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

function Chat() {
  const [Chat, setChat] = useState([]);

  return (
    <>
      <div className="contact">
        <Contact />
      </div>
      <div className="message">
        <Message />
      </div>
    </>
  );
}

export default Chat;