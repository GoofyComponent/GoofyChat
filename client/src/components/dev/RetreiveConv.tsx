import axios from "axios";
import { useEffect, useState } from "react";
import { accountService } from "../../helpers/authHelpers";
import { redirect } from "react-router-dom";

const CreateConv = () => {
  const callableList = ["http://localhost:8245/api/conversation/create"];

  useEffect(() => {
    axios
      .post(
        callableList[0],
        {
          conv_name: "test4",
          usersEmail: [],
        },
        {
          headers: {
            Authorization: `Bearer ${accountService.getJWT()}`,
          },
        }
      )
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
  const config2 = {
    headers: {
      Authorization: `Bearer ${accountService.getJWT()}`,
    },
  };

  useEffect(() => {
    axios
      .post("http://localhost:8245/api/conversation/3", {}, config2)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        /* return redirect("/login"); */
        //return (window.location.href = "/");
      });
  }, []);

  return <div>VOIS LA CONSOLE</div>;
};

const PostList = () => {
  const [message, setMessage] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${accountService.getJWT()}`,
    },
  };

  const handleMessageSend = () => {
    console.log(message);

    console.log(localStorage.getItem("token"));

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

const SubscribeConv = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${accountService.getJWT()}`,
    },
  };

  useEffect(() => {
    axios
      .post("http://localhost:8245/api/mercureLogin", {}, config)
      .then((res) => {
        console.log(res);
        //set the mercureCookie
        accountService.createMercureCookie(res.data.mercurePersonalJWT);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const subscribe = () => {
    const url = new URL("http://localhost:9090/.well-known/mercure");

    url.searchParams.append(
      "topic",
      "https://goofychat-mercure/conversation/3"
    );

    const eventSource = new EventSource(url, { withCredentials: true });

    eventSource.onmessage = (e) => {
      console.log(e);
    };
  };

  return (
    <>
      <button onClick={() => subscribe()}>listeningtoevent</button>
    </>
  );
};

export default SubscribeConv;
