import axios from "axios";
import { useEffect, useState } from "react";
import { accountService } from "../../helpers/authHelpers";
import { redirect } from "react-router-dom";

const CreateConv = () => {
  const callableList = ["http://localhost:8245/api/conversation/create"];

  useEffect(() => {
    console.log(accountService.extractMailFromJWT());

    axios
      .post(callableList[0], {
        conv_name: "test4",
        usersEmail: [accountService.extractMailFromJWT()],
      })

      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        /* return redirect("/login"); */
        //return (window.location.href = "/");
      });
  }, []);

  return (
    <>
      <div>VOIS LA CONSOLE</div>
    </>
  );
};

const RetreiveConv = () => {
  const callableList = ["http://localhost:8245/api/conversation/3"];

  useEffect(() => {
    console.log(accountService.extractMailFromJWT());

    axios
      .get(callableList[0], {})
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        /* return redirect("/login"); */
        //return (window.location.href = "/");
      });
  }, []);

  return (
    <>
      <div>VOIS LA CONSOLE</div>
    </>
  );
};

const PostList = () => {
  const [message, setMessage] = useState("");

  const handleMessageSend = () => {
    console.log(message);

    console.log(localStorage.getItem("token"));

    const config = {
      headers: {
        Authorization: `Bearer ${accountService.getJWT()}`,
      },
    };

    axios
      .post(
        `http://localhost:8245/api/message/publish/${2}`,
        {
          message: message,
        },
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setMessage("");
      });
  };

  return (
    <>
      <input
        aria-label="message"
        type="text"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => handleMessageSend()}>Send</button>
    </>
  );
};

export default PostList;
