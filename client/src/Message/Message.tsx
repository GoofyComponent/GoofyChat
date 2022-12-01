import { useState } from "react";
import "./Message.css";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Chat from "../Chat/Chat";

// Affichage des messages
function Message() {
  const [Message, setMessage] = useState([]);

  return (
    <>
      <div>
        <ProfilePicture />
        {/* Input group name */}
        <div className="head-group">
          <h1 className="group-name">Michel, Jean-François</h1>
        </div>
        <div>
          {/* For each message, look for who send it and sort by date */}
          {/* Name of the user */}
          <p className="message-received-user">Michel</p>
          <div className="message-box-received">
            {/* Message */}
            <p className="message-received">Salut !</p>
          </div>
          {/* Date */}
          <p className="date-received">12/12/2021</p>
        </div>
      </div>
    </>
  );
}

export default Message;