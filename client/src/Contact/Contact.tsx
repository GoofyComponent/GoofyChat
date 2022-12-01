import { useState } from "react";
import "./Contact.css";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

function Contact() {
  const [Contact, setContact] = useState([]);

  return (
    <>
      <div className="contactlist">
        {/* Input profilepicture from user + name */}
        <ProfilePicture />
        <h1 className="conv-name-list">Michel</h1>
        {/* Last message */}
        <p className="last-message">Salut !</p>
        {/* Date last message */}
        <p className="date-last-message">12/12/2021</p>
      </div>
    </>
  );
}

export default Contact;