import { useState } from "react";
import "./ProfilePicture.css";

function ProfilePicture() {
  const [Message, setMessage] = useState([]);

  return (
    <>
        {/* Input profilepicture from user */}
        <img className="profile-picture" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
    </>
  );
}

export default ProfilePicture;