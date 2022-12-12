import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistStore } from "redux-persist";

import { eraseMessagesSlice } from "../../helpers/redux/slices/MessagesSlice";
import { eraseAllUser } from "../../helpers/redux/slices/UserSlice";
import { appHelpers } from "../../helpers/appHelpers";

import GCLogo from "../../assets/img/goofychat.png";
import store from "../../helpers/redux/store";
import { LoginModal } from "./LoginModal";
import { toggleFastLoginModal } from "../../helpers/redux/slices/appSlice";

const Name = (username: string) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fastloginmodal = useSelector((state: any) => state.app.FASTLOGINMODAL);

  return (
    <div className="flex items-center">
      {fastloginmodal && <LoginModal />}
      <p className="text-secondary hidden md:block text-xl font-bold mx-2">
        Hello, {username} !
      </p>
      <div>
        <button
          className="w-32 hidden md:block h-10 p-auto mx-2 rounded-2xl text-center bg-secondary text-tertiary font-bold hover:bg-primary hover:text-primary transition-all border-2 border-transparent hover:border-primary"
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleFastLoginModal());
          }}
        >
          FASTLOGIN
        </button>
        <button
          className="w-20 h-10 p-auto mx-2 rounded-2xl text-center bg-secondary text-tertiary font-bold hover:bg-primary hover:text-primary transition-all border-2 border-transparent hover:border-primary"
          onClick={(e) => {
            e.preventDefault();
            appHelpers.deleteMercureCookie();
            dispatch(eraseAllUser());
            dispatch(eraseMessagesSlice());
            persistStore(store).purge();
            navigate("/");
            location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export const Header = () => {
  const username = useSelector((state: any) => state.user.username);

  return (
    <header className="bg-primary flex items-center justify-between p-4">
      <div className="flex items-center">
        <img src={GCLogo} alt="logo" className="object-contain w-2/12 mx-2" />
        <h1 className="text-4xl font-bold mx-2">
          <span className="text-primary">Goofy</span>
          <span className="text-secondary">Chat</span>
        </h1>
      </div>
      {
        username && Name(username) /* : (
        <Skeleton
          className="flex items-center !w-96 h-10"
          baseColor="#192124"
          highlightColor="#3B4D54"
        />
      ) */
      }
    </header>
  );
};
