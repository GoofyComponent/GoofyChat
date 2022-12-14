import { useEffect } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "../components/base/Header";
import { ConversationList } from "../components/group/list/ConversationList";

import {
  setTriggerRefreshConv,
  triggerPosition,
  updateConvMessage,
  updateCurrConvMsgs,
} from "../helpers/redux/slices/MessagesSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /* const { id } = useParams<{ id: string }>(); */

  const APIJWT = useSelector((state: any) => state.user.JWT_API);
  const mercureListener = useSelector(
    (state: any) => state.user.mercureListener
  );
  const mercureJWT = useSelector((state: any) => state.user.JWT_Mercure);

  useEffect(() => {
    if (APIJWT === null) {
      navigate("/login");
    }

    //if (document.cookie.indexOf("mercureAuthorization") === -1) return;

    const urlEventSource = new URL(
      `${import.meta.env.VITE_MERCURE_URL}/.well-known/mercure`
    );
    urlEventSource.searchParams.append("topic", mercureListener);

    /* const eventSource = new EventSource(urlEventSource.toString(), {
      headers: { Authorization: `Bearer ${mercureJWT}` },
    }); */

    const eventSource = new EventSource(
      urlEventSource,
      //Add the JWT to the Authorization header of the request
      {
        withCredentials: true,
      }
    );

    eventSource.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log("onmessage", data);

      if (data.type === "conversation") {
        dispatch(setTriggerRefreshConv());
      } else {
        data = {
          ...data,
          created_at: new Date(data.created_at.date).toString(),
        };

        //console.log(data.id === id, data.id, id, "data.id === id");

        if (data !== null) {
          dispatch(updateConvMessage(data));
          dispatch(updateCurrConvMsgs(data));
          dispatch(triggerPosition());
        }
      }
    };

    eventSource.onerror = (event) => {
      console.log("onerror", event);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col md:justify-start md:flex-row my-auto md:overflow-hidden">
        {/* Contact block */}
        <ConversationList />
        {/* End Contact block */}
        <Outlet />
      </div>
    </>
  );
}

export default App;
