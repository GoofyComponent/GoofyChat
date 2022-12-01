import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "../components/base/Header";
import { ChatContainer } from "../components/chat/ChatContainer";
import { accountService } from "../helpers/authHelpers";
import { setJWT_API } from "../helpers/redux/slices/UserSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const APIJWT = useSelector((state: any) => state.user.JWT_API);

  useEffect(() => {
    if (APIJWT === null) {
      navigate("/login");
    }

    if (document.cookie.indexOf("mercureAuthorization") === -1) return;

    const config = {
      headers: {
        Authorization: `Bearer ${APIJWT}`,
      },
    };

    axios
      .post("http://localhost:8245/api/mercureLogin", {}, config)
      .then((res) => {
        //console.log(res.data);
        accountService.createMercureCookie(res.data.mercurePersonalJWT);
      })
      .catch((err) => {
        console.log(err);
        dispatch(setJWT_API(null));
        return navigate("/login");
      });
  }, []);

  return (
    <>
      <Header />
      {/* Contact block */}
      <div className="flex justify-start my-auto">
        <div className="w-3/12 bg-red-200 h-minusHeader hidden md:block"></div>
        <ChatContainer />
      </div>
    </>
  );
}

export default App;
